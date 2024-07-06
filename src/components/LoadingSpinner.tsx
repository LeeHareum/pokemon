export const LoadingSpinnerBlack = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-black border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export const LoadingSpinnerWhite = () => {
  return (
    <div className="flex mt-9 items-top justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
