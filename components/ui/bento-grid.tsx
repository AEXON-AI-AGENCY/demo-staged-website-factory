import Image from "next/image"
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background?: ReactNode
  Icon?: ElementType
  description: string
  href: string
  cta: string
  backgroundImage?: string
  imageAlt?: string
  imagePriority?: boolean
  overlayClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  ctaVariant?: ComponentProps<typeof Button>["variant"]
  ctaClassName?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  backgroundImage,
  imageAlt,
  imagePriority = false,
  overlayClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  ctaVariant = "link",
  ctaClassName,
  ...props
}: BentoCardProps) => {
  if (backgroundImage) {
    return (
      <div
        key={name}
        className={cn(
          "group relative col-span-3 overflow-hidden rounded-xl",
          "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
          className
        )}
        {...props}
      >
        <Image
          src={backgroundImage}
          alt={imageAlt ?? ""}
          fill
          priority={imagePriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {background && <div>{background}</div>}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent",
            overlayClassName
          )}
        />
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div
          className={cn(
            "relative z-10 flex h-full flex-col justify-end gap-3 p-5",
            contentClassName
          )}
        >
          <div className="space-y-2">
            <p
              className={cn(
                "max-w-lg text-sm text-white/80",
                descriptionClassName
              )}
            >
              {description}
            </p>
            <h3
              className={cn(
                "text-xl font-semibold text-white sm:text-2xl",
                titleClassName
              )}
            >
              {name}
            </h3>
          </div>
          <div className="pointer-events-none flex w-full flex-row items-center">
            <Button
              variant={ctaVariant}
              size="sm"
              className={cn("pointer-events-auto", ctaClassName)}
              render={<a href={href} />}
              nativeButton={false}
            >
              {cta}
              <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      <div className="p-4">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          {Icon && (
            <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
          )}
          <h3
            className={cn(
              "text-xl font-semibold text-neutral-700 dark:text-neutral-300",
              titleClassName
            )}
          >
            {name}
          </h3>
          <p className={cn("max-w-lg text-neutral-400", descriptionClassName)}>
            {description}
          </p>
        </div>

        <div
          className={cn(
            "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
          )}
        >
          <Button
            variant={ctaVariant}
            size="sm"
            className={cn("pointer-events-auto p-0", ctaClassName)}
            render={<a href={href} />}
            nativeButton={false}
          >
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        )}
      >
        <Button
          variant={ctaVariant}
          size="sm"
          className={cn("pointer-events-auto p-0", ctaClassName)}
          render={<a href={href} />}
          nativeButton={false}
        >
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
    </div>
  )
}

export { BentoCard, BentoGrid }
