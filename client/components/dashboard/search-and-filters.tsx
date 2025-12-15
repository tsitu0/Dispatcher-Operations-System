"use client"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchAndFiltersProps {
  searchId: string
  onSearchIdChange: (value: string) => void
  onReset: () => void
}

export function SearchAndFilters({ searchId, onSearchIdChange, onReset }: SearchAndFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search container ID..."
              value={searchId}
              onChange={(e) => onSearchIdChange(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchId && (
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
