function CardSkeleton() {
  return (
    <div className="w-3xs aspect-[2/2.5] rounded-2xl bg-(--color-surface-1) p-4">
      <div className="h-full flex flex-col gap-8">
        <div className="w-full aspect-[2/1.5] rounded-2xl bg-gray-300 relative animate-pulse">
          <div className="flex items-center gap-1 absolute -bottom-4 left-4 rounded-full bg-gray-600 px-4 py-2">
            <div className="w-4 h-4 rounded-sm bg-gray-300 animate-pulse" />
            <span className="w-16 h-4 rounded-sm bg-gray-300 animate-pulse" />
          </div>
        </div>
        <div className="h-full flex flex-col justify-between px-4">
          <div>
            <div className="flex gap-2 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-sm bg-gray-300 animate-pulse" />
                <span className="w-16 h-4 bg-gray-300 rounded-sm animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-sm bg-gray-300 animate-pulse" />
                <span className="w-16 h-4 rounded-sm bg-gray-300 animate-pulse" />
              </div>
            </div>
            <h4 className="w-3/4 h-6 rounded-sm bg-gray-300 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-gray-300 animate-pulse" />
            <span className="w-24 h-4 rounded-sm bg-gray-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
