import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/query/product.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface DeleteConfirmDialogProps {
  productId: number;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const DeleteConfirmDialog = ({
  productId,
  isDialogOpen,
  setIsDialogOpen,
}: DeleteConfirmDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Product deleted successfully!",
        description: `${productId} successfully deleted`,
      });

      setIsDialogOpen(false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onDelete = () => {
    mutation.mutate({ id: productId });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent aria-label="delete">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 grid-rows-2 gap-y-2">
          <DialogClose asChild>
            <Button type="button" variant={"ghost"} className="!ml-0">
              Cancel
            </Button>
            <Button type="button" onClick={onDelete}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
