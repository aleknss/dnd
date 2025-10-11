import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <div>
        <h1>Información de D&D</h1>
        <Button
          to="/classes"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          }
          label="Classes"
        />
      </div>
    </>
  );
}
