'use client'

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Memberbtn from "./ui/Memberbtn";

interface MemberCardProps {
    title: string;
    list: { name: string }[];
}

interface MembersData {
    admins: { name: string }[];
    members: { name: string }[];
}

function MemberCard({ list }: MemberCardProps) {
    return (
        <div className="px-20 md:h-[70vh] mx-10 flex justify-center items-center">
            <ul className="space-y-1">
                {list.map((member, i: number) => (
                    <li key={i} className="text-white md:text-9xl text-6xl text-center">
                        {member.name}
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
    const [data, setData] = useState<MembersData>({ admins: [], members: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch('/api/members');
                if (!res.ok) {
                    throw new Error('Failed to fetch members');
                }
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching members:', error);
                setError('Failed to load members data');
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-white text-xl">Loading members...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

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
