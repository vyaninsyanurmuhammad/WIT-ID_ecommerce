import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import * as yup from "yup";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postImage } from "@/query/image.query";
import { Loader2 } from "lucide-react";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

type Image = {
  originalname: string;
  filename: string;
  location: string;
};

interface UploadImageDialog {
  onChange?: (image: Image) => void;
  disabled?: boolean;
}

const UploadImageDialog = ({  onChange, disabled }: UploadImageDialog) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [newPhoto, setNewPhoto] = useState("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: postImage,
    onSuccess: (data) => {
      onChange && onChange(data);

      toast({
        variant: "default",
        title: "Image uploaded successfully!",
        description: `Response data: ${data.location}`,
      });

      setOpenDialog(false);

      setResetValues();

      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const ImageSchema = yup.object({
    image: yup
      .mixed<File>()
      .test("fileSize", "Max image size is 1MB.", (value) => {
        if (value && value instanceof File) {
          return value.size <= 1000000;
        }
        return false;
      })
      .test(
        "fileType",
        "Only .jpg, .jpeg, .png and .gif formats are supported.",
        (value) => {
          if (value && value instanceof File) {
            return ACCEPTED_IMAGE_TYPES.includes(value.type);
          }
          return false;
        },
      ),
  });

  const onCropComplete = (croppedArea: Area, croppedPixels: Area) => {
    // Set cropped area pixels for later processing
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(newPhoto, croppedAreaPixels);
      if (croppedImage) {
        mutation.mutate({ file: croppedImage });
      } else {
        toast({
          variant: "destructive",
          title: "Crop image failed.",
          description: "image required.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Crop image failed.",
        description: "An unexpected error occurred during image uploading.",
      });
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setResetValues();
    }
    setOpenDialog(open);
  };

  const setResetValues = () => {
    setNewPhoto("");
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels({ width: 0, height: 0, x: 0, y: 0 });
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        await ImageSchema.validate({ image: file });

        const reader = new FileReader();

        reader.onloadend = () => {
          setNewPhoto(reader.result as string);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          toast({
            variant: "destructive",
            title: error.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: "An unexpected error occurred.",
          });
        }

        event.target.value = "";
      }
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleDialogChange}>
      <DialogTrigger disabled={disabled} asChild>
        <Button
          type="button"
          className="rounded-full text-sm"
          disabled={disabled}
          onClick={() => setOpenDialog(true)}
        >
          Upload Gambar
        </Button>
      </DialogTrigger>
      <DialogContent
        key={"images"}
        className="font-rubik dark:bg-zinc-900"
        aria-hidden="false"
        aria-label="images"
      >
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <input
            id="edit-avatar"
            name="avatar"
            type="file"
            accept="image/*"
            hidden
            disabled={mutation.isPending}
            onChange={onChangeFile}
          />
          <label
            htmlFor="edit-avatar"
            className="cursor-pointer font-semibold underline"
          >
            Select Photo
          </label>
        </div>
        <div className="relative">
          {newPhoto ? (
            <>
              <div className="relative aspect-square">
                <Cropper
                  image={newPhoto}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete} // Make sure crop area is updated
                  onZoomChange={setZoom}
                />
              </div>
              <div className="mt-4 flex gap-4">
                <p>Zoom</p>
                <Slider
                  min={1}
                  max={3}
                  defaultValue={[zoom]}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                />
              </div>
            </>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-sm border-2 border-dashed border-gray-700">
              <p className="text-center">
                A preview of your new photo will be included here.
              </p>
            </div>
          )}
        </div>
        <Button
          onClick={handleCropImage}
          disabled={mutation.isPending}
          aria-label="Close"
        >
          Add Image{" "}
          {mutation.isPending && <Loader2 className="h-4 w-5 animate-spin" />}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageDialog;
