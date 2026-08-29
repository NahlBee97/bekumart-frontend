const Loading = () => {
    return (
      <div className="flex h-screen items-center justify-center bg-mist">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-frost-light"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-frost animate-spin"></div>
        </div>
      </div>
    );
};

export default Loading;