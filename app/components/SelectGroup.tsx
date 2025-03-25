"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectGroupAction } from "../actions";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstName: string;
}

export let selectedGroup: string = "";

export function SelectGroup({ data }: { data: User[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false); // Add isLoading state

  const handleSelect = async (currentValue: string) => {
    setIsLoading(true); // Set loading to true when selection starts
    setValue(currentValue === value ? "" : currentValue);
    selectedGroup = currentValue === value ? "" : currentValue;
    setOpen(false);

    if (currentValue && currentValue !== value) {
      try {
        await selectGroupAction(currentValue);
        router.push(`?userId=${currentValue}&filter=1`);
      } catch (error) {
        console.error("Error calling server action:", error);
      } finally {
        setIsLoading(false); // Set loading to false when selection finishes
      }
    } else {
      setIsLoading(false); // Set loading to false if no server action
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={isLoading} // Disable button when loading
        >
          {value
            ? data.find((user) => user.firstName === value)?.firstName
            : "Hatim Kodunu Seciniz"}
          {isLoading ? (
            <Loader2 className="animate-spin" /> // Show loader when loading
          ) : (
            <ChevronsUpDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Hatim Kodunu Ara"
            className="h-9"
            disabled={isLoading} // Disable input when loading
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.firstName}
                  onSelect={(currentValue) => handleSelect(currentValue)}
                  disabled={isLoading} // Disable item when loading
                >
                  {item.firstName}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.firstName ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
