interface MessagePopupProps {
  description: string;
  name: string;
  image: string;
  onClose: () => void;
}

export default function messagePopup({
  description,
  name,
  image,
  onClose,
}: MessagePopupProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-5/6 h-5/6 bg-white border-black border-8 rounded-xl p-8 flex flex-col justify-around items-center">
        <div>
          <img className="rounded-xl" src={image} alt="Karaktär" />
          <h2>{name}</h2>
        </div>
        <p>{description}</p>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Vidare!
        </button>
      </div>
    </div>
  );
}
