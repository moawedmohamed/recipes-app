
interface ViewMoreButtonProps {
  onClick: () => Promise<void>;
}

export default function ViewMoreButton({ onClick }: ViewMoreButtonProps) {
  return (
    <button className="view-more-button" onClick={onClick}>
      View More
    </button>
  );
}
