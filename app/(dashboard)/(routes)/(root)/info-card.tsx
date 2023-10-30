import IconBadge from '@/components/icon-badge'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InfoCardProps {
    icon: LucideIcon,
    label: string,
    numberOfItems: number,
    variant?: "default" | "success"
}

const InfoCard = ({
    icon: Icon,
    variant,
    label,
    numberOfItems,
}: InfoCardProps) => {
  return (
    <div className="flex items-center border p-3 gap-x-2 rounded-md">
        <IconBadge
            variant={variant}
            icon={Icon}
          />
          <div>
            <p className="font-medium">
               {label}
            </p>
            <p className="text-sm text-gray-500">
                {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
            </p>
          </div>
    </div>
  )
}

export default InfoCard