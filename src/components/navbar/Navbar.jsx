{/* ABOUT DROPDOWN */}
<DropdownMenu
  trigger={
    <span
      className={`${navItemBase} ${navItemHover} cursor-pointer flex items-center gap-2`}
    >
      About
      <span className="text-xs transition-transform group-data-[state=open]:rotate-180">
        ▼
      </span>
    </span>
  }
>
  <div
    className="
      relative bg-white
      border-4 border-black
      shadow-[8px_8px_0_#000]
      w-56
      p-2
    "
  >
    {/* Header strip */}
    <div
      className="
        mb-2 px-3 py-2
        bg-yellow-300
        border-2 border-black
        font-(--font-comic)
        font-extrabold
        text-black
        text-lg
        shadow-[3px_3px_0_#000]
      "
    >
      ABOUT US
    </div>

    {/* Items */}
    {[
      { label: "What we do", href: "/about#what" },
      { label: "Who we are", href: "/about#who" },
      { label: "Our aim", href: "/about#aim" },
    ].map((item, index) => (
      <DropdownMenuItem key={item.label} className="p-0">
        <Link
          href={item.href}
          className="
            group block w-full px-4 py-3
            font-(--font-comic) text-lg text-black
            border-2 border-transparent
            hover:border-black
            hover:bg-yellow-200
            hover:shadow-[4px_4px_0_#000]
            transition-all duration-150
          "
        >
          <span className="flex items-center gap-2">
            <span className="text-red-600 font-extrabold">
              {index + 1}.
            </span>
            {item.label}
          </span>
        </Link>
      </DropdownMenuItem>
    ))}
  </div>
</DropdownMenu>
