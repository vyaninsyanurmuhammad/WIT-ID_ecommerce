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
import { Loader2 } from "lucide-react";
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
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Produk berhasil dihapus!",
        description: `Produk dengan ID ${productId} telah berhasil dihapus`,
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
          <DialogTitle>Apakah Anda yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin
            menghapus file ini secara permanen dari server kami?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 grid-rows-2 gap-y-2">
          <DialogClose asChild disabled={mutation.isPending}>
            <Button
              disabled={mutation.isPending}
              type="button"
              variant={"ghost"}
              className="!ml-0"
            >
              Batal
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={onDelete}
            disabled={mutation.isPending}
            className="!ml-0"
          >
            Konfirmasi{" "}
            {mutation.isPending && <Loader2 className="h-4 w-5 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
