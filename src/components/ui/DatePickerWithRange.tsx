"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerWithRangeProps {
    value?: DateRange;
    onChange: (value: DateRange | undefined) => void;
    className?: string;
    placeholder?: string;
    numberOfMonths?: number;
}

export function DatePickerWithRange({
    value,
    onChange,
    className,
    placeholder = "Pick a date",
    numberOfMonths = 2,
}: DatePickerWithRangeProps) {
    return (
        <Field className={cn("w-70", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker-range"
                        className="flex h-full w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-secondary"
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                            {value?.from ? (
                                value.to ? (
                                    <>
                                        {format(value.from, "LLL dd, y")} -{" "}
                                        {format(value.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(value.from, "LLL dd, y")
                                )
                            ) : (
                                <span className="text-muted-foreground">
                                    {placeholder}
                                </span>
                            )}
                        </div>

                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onChange}
                        numberOfMonths={numberOfMonths}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}