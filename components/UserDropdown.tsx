'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserDropdown = () => {
    const router=useRouter();
    const handleSignOut= async()=>{
        router.push('/sign-in');
    }
    const user ={ name: "John Doe", email:'contact@priyabrata.com' };
  return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
                <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
                </Avatar>
                <div className="hidden md-flex flex-col items-start">
                    <span className="text-base font-medium text-gray-400">{user.name}</span>
                </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
            <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
        </DropdownMenu>

  )
}

export default UserDropdown