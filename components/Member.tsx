'use client'

import React from "react";
import Marquee from "react-fast-marquee";
import data from "../nama.json";
import Memberbtn from "./ui/Memberbtn";

interface MemberCardProps {
    title: string;
    list: string[];
}

function MemberCard({ list }: MemberCardProps) {
    return (
        <div className="px-20 md:h-[70vh] mx-10 flex justify-center items-center">

            <ul className="space-y-1">
                {list.map((name: string, i: number) => (
                    <li key={i} className="text-white md:text-9xl text-6xl text-center">
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export default function MemberMarquee() {
    const groupedMembers = chunkArray(data.members, 5);

    return (
        <div>
            <div className="flex flex-col items-center md:p-20 md:mt-0 mt-60">
                <div className="relative mr-[35%] text-4xl md:p-5 "><h1>Core Team</h1></div>
                <div className="md:w-3xl w-50 h-1 bg-white"></div>
            </div>
            <div className="w-full py-10 relative">
                <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none blur-2xl bg-[radial-gradient(circle,rgba(10,10,10,1)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="absolute inset-0 flex items-center z-20 justify-center">
                    <Memberbtn />
                </div>
                <Marquee gradient={false} speed={300}>
                    <div className="flex gap-20">
                        {groupedMembers.map((group, idx) => (
                            <MemberCard key={idx} title={`Members ${idx + 1}`} list={group} />
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
}
