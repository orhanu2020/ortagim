"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { FolderPlus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createGroup } from "../actions";
import { useFormStatus } from "react-dom";

const AddBatch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false); // Add isLoading state
  const { pending } = useFormStatus();
  const handleFormSubmit = async (formData: FormData) => {
    console.log("started");
    setIsLoading(true); // Set loading to true when form submission starts
    if (formData.get("id")?.toString().trim() !== "") {
      await createGroup(formData);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    setIsLoading(false); // Set loading to false when form submission finishes
    console.log("ended");
  };

  return (
    <form className="w-full" action={handleFormSubmit}>
      <div className="flex m-4 relative">
        <Input
          type="text"
          id="batch"
          placeholder="Isim"
          className="pr-8"
          name="id"
          required
          minLength={1}
          ref={inputRef}
          disabled={isLoading} // Disable input when loading
        />
        <Button
          type="submit"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blend-soft-light cursor-pointer"
          disabled={isLoading} // Disable button when loading
        >
          {pending ? <Loader /> : <FolderPlus />}
        </Button>
      </div>
    </form>
  );
};

export default AddBatch;
