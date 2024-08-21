interface MessagePopupProps {
  description: string;
  name: string;
  image: string;
}

export default function messagePopup({
  description,
  name,
  image,
}: MessagePopupProps) {
  return (
    <div className="w-4/5 h-4/5 bg-white border-black rounded-xl p-3 flex justify-around items-center">
      <img className="rounded-xl" src={image} alt="Karaktär" />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
