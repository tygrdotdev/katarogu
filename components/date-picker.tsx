import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function DatePicker({ value, setValue }: any) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className=" w-auto p-0">
				<Calendar
					mode="single"
					captionLayout="dropdown-buttons"
					selected={value}
					onSelect={setValue}
					fromYear={1960}
					toYear={2030}
				/>
			</PopoverContent>
		</Popover>
	);
}