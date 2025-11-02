"use client";

import Image from "next/image";
import task from "./../../assets/images/task.png";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { firestoreDB } from "@/lib/firebaseConfig";
import { collection, getDocs, doc, deleteDoc} from "firebase/firestore";
//สรเางประเภทข้อมูลแบบ Task
type Task = {
  id: string;
  created_at: string;
  title: string;
  detail: string;
  image_url: string;
  is_completed: boolean;
  update_at: string;
};
export default function Page() {
  //สร้างตัวแปร state สำหรับเก็บข้อมูลรายการงานทั้งหมด
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    //ดึงข้อมูลรายการงานทั้งหมดจาก Firebase
    const fetchTasks = async () =>{
        //ดึงข้อมูลมา
        const data = await getDocs(collection(firestoreDB, "task_cl"));
        //เอาข้อมูลที่ดึงมาไปกำหนดให้กับ state: tasks

        setTasks(
            data.docs.map((doc)=>({
                id: doc.id,
                title : doc.data().title,
                detail : doc.data().detail,
                image_url: doc.data().image_url,
                is_completed: doc.data().is_completed,
                created_at: doc.data().created_at?.toDate() ?? null,
                update_at:doc.data().update_at?.toDate() ?? null
            }))
        )
    }

    fetchTasks();
  }, []);

  const handleDeleteClick = async (id: string) => {
    //ก่่อนลบ ให้แสดง confirm dialog ถามผู้ใช้ก่อน
     if (confirm("คุณต้องการลบข้อมูลใช่หรือไม่")) {
      //ลบข้อมูลใน supabase ต่าม id 
      await deleteDoc( doc(firestoreDB, "task_cl", id) );
        //ลบข้อมูลใน state ออกด้วย
        setTasks(tasks.filter((task) => task.id !== id));

         alert("ลบข้อมูลเรียบร้อย");
      
     }
    };
  return (
    <>
      <div className="flex flex-col items-center">
        <Image className="mt-20" src={task} alt="Task" width={120} />
        <h1 className="mt-10 text-2xl font-bold text-cyan-700">
          Manage Task App
        </h1>
        <h1 className="mt-5 text-lg text-cyan-700">บริการจัดการงานที่ทำ</h1>
        {/* ส่วนปุ่มเพิ่มงาน*/}
        <div className="flex justify-end w-10/12">
          <Link
            href="/add-task"
            className="mt-5 text-white bg-cyan-500 px-8 py-2 rounded hover:bg-cyan-700"
          >
            เพิ่มงาน
          </Link>
        </div>

        {/* ส่วนแสดงรายการงานทั้งหมด */}
        <div className="w-10/12 flex mt-5">
          <table className="w-full border">
            {/*หัวตาราง */}
            <thead>
              <tr className="text-center border font-bold bg-gray-300">
                <td className="border p-2">รูป</td>
                <td className="border p-2">งานที่ต้องการ</td>
                <td className="border p-2">รายละเอียดงาน</td>
                <td className="border p-2">สถานะ</td>
                <td className="border p-2">วันที่เพิ่ม</td>
                <td className="border p-2">วันที่แก้ไข</td>
                <td className="border p-2">ACTION</td>
              </tr>
            </thead>

            {/*เนื้อหาในตาราง */}
            <tbody>
              {/*วนลูปอาข้อมูลที่อยู่ในตัวแปร tasks มาแสดง */}
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border p-2">
                    {task.image_url ? (
                      <Image
                        className="mx-auto"
                        src={task.image_url}
                        alt={task.title}
                        width={50}
                        height={50}
                      />
                    ) : (
                      "."
                    )}
                  </td>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.detail}</td>
                  <td className="border p-2">
                    {task.is_completed == true ? "✅สำเร็จ" : "❌ไม่สำเร็จ"}
                  </td>
                  <td className="border p-2">
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    {new Date(task.update_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <Link className="text-green-500 mr-5" href={`/updatetask/${task.id}`}>
                      แก้ไข
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(task.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
}
