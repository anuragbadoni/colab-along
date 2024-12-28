"use client";
import React from "react";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";

import { ClipboardX, Loader, Plus, SearchX, StarOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import BoardCard from "./BoardCard";
import { BoardListProps } from "@/types";

import { useRouter } from "next/navigation";
import Room from "./Room";

const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <SearchX className="w-[100px] h-[100px]" />
      <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};

const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <StarOff className="w-[100px] h-[100px]" />
      <h2 className="text-2xl font-semibold mt-6">No favorite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try setting a board to favorite
      </p>
    </div>
  );
};

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const handleCreateBoard = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <ClipboardX className="w-[100px] h-[100px]" />
      <h2 className="text-2xl font-semibold mt-6">
        No boards found! Create your first board!
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating your first organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={handleCreateBoard} size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
};

const NewBoardButton = ({
  orgId,
  disabled,
}: {
  orgId: string;
  disabled?: boolean;
}) => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const handleCreateBoard = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleCreateBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-primary rounded-lg hover:bg-yellow-600 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-primary cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export default function BoardList({ orgId, query }: BoardListProps) {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <Room
            key={board._id}
            roomId={board._id}
            fallback={<BoardCard.Skeleton />}
          >
            <BoardCard
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={board.isFavorite}
            />
          </Room>
        ))}
      </div>
    </div>
  );
}
