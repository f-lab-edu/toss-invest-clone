import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export default function Header() {
    const [isLogin] = useState(false);

    return (
        <header className="max-w-[1856px] w-full h-13 sticky-top-0 flex items-center">
            <nav className="min-w-[712px] w-full h-10 mx-auto flex items-center px-4">
                <div className="min-w-[120px] shrink-0">
                    <img src="/public/logo.png" width="78" height="20" alt="로고이미지"/>
                </div>
                <div className="flex-1">
                    <ul className="flex text-[15px]">
                        <li className="px-3 py-1.5">홈</li>
                        <li className="px-3 py-1.5">주식 골라보기</li>
                        <li className="px-3 py-1.5">내 계좌</li>
                    </ul>
                </div>
                <div>
                    { isLogin ?
                        <Button variant="default" size="sm">로그인</Button> :
                        <img className="rounded-md" src="/public/profile.webp" width="32" height="32" alt="프로필이미지"/>
                    }
                </div>
            </nav>
        </header>
    )
}