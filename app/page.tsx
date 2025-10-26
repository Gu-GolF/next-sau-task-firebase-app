import Image from "next/image";
import task from "./../assets/images/task.png"
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <>
   <div className="flex flex-col items-center">
    <Image className="mt-20" src={task} alt="Task" width={200}/>
    <h1 className="mt-10 text-4xl font-bold text-cyan-700">
      Manage Task App by Firebase
    </h1>
    
    <h1 className="mt-5 text-2xl text-cyan-700">
      บริการจัดการงานที่ทำ
    </h1>
    <Link href="/alltask" className="mt-10 text-white bg-cyan-500 px-15 py-4 rounded hover:bg-cyan-700">
      เข้าใช้งานแอปพลิเคชั่น
    </Link>

    <Footer/>
   </div>
    </>
  );
}
