import { PlusIcon } from "lucide-react";

export default async function ProtectedPage() {

  return (
    <div className="h-full p-6 space-y-14">

      <div className="flex items-center justify-between h-12">
        <h1 className="text-[#95A4B2] text-lg">Projects</h1>

        <button className="flex items-center gap-2 p-4 pl-3 h-10 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
          <PlusIcon size={18} />
          Create Project
        </button>
      </div>

      <div className="flex items-center gap-6">
        {Array.from(({ length: 3 })).map(() => (

          <div className="bg-[#1D2226] text-xs group flex flex-col justify-between h-32 w-full p-4 rounded-3xl text-[#95A4B2]">
            <div className="flex justify-between ">
              <div className="space-y-1">
                <h1 className="text-base text-white">Code editor</h1>
                <p>updated: 4 days ago</p>
              </div>

              <svg className="relative left-0 duration-300 group-hover:brightness-150 group-hover:left-2" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1614 14.6651L12.6797 10.097C12.536 9.97732 12.3612 9.90108 12.1758 9.8772C11.9903 9.85332 11.8019 9.88278 11.6326 9.96214C11.4633 10.0415 11.3201 10.1675 11.2198 10.3253C11.1196 10.4831 11.0663 10.6662 11.0664 10.8532V18.9491C11.0666 19.136 11.12 19.3189 11.2203 19.4766C11.3207 19.6342 11.4639 19.76 11.6331 19.8392C11.8024 19.9184 11.9907 19.9478 12.1761 19.9238C12.3614 19.8999 12.5361 19.8237 12.6797 19.7041L18.1614 15.1372C18.196 15.1084 18.2238 15.0723 18.2429 15.0315C18.262 14.9907 18.2719 14.9462 18.2719 14.9012C18.2719 14.8561 18.262 14.8116 18.2429 14.7708C18.2238 14.73 18.196 14.6939 18.1614 14.6651Z" fill="#434B52" />
              </svg>

            </div>

            <div className="flex items-center gap-4">
              <p>Javascript: 2</p>
              <hr className="bg-[#313B42] rotate-90 w-4" />
              <p>CSS: 0</p>
            </div>

          </div>

        ))}
      </div>

    </div>
  );
}
