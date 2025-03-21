"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to the app</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn("discord", { callbackUrl: "/" })}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-indigo-600 px-4 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.952 5.672C19.952 5.672 17.376 3.456 14.352 3.456L14.104 3.704C17.352 4.432 18.872 5.64 20.12 7.304C17.352 5.64 14.584 4.96 12.088 4.96C9.592 4.96 6.824 5.64 4.056 7.304C5.304 5.64 7.064 4.216 10.072 3.704L9.824 3.456C6.824 3.456 4.224 5.672 4.224 5.672C4.224 5.672 1.456 10.12 1.456 15.784C1.456 15.784 3.096 18.76 7.304 18.76L8.072 17.776C6.824 17.048 5.576 15.832 5.576 15.832C5.576 15.832 5.824 16.016 6.32 16.264C6.344 16.264 6.368 16.288 6.392 16.288C6.44 16.312 6.488 16.336 6.536 16.36C7.304 16.768 8.072 17.048 8.84 17.264C10.12 17.624 11.624 17.84 13.352 17.624C14.584 17.48 15.816 17.168 17.072 16.624C17.84 16.288 18.656 15.832 19.472 15.16L18.704 18.76C22.912 18.76 24.552 15.784 24.552 15.784C24.552 10.12 21.784 5.672 19.952 5.672ZM8.84 14.32C7.752 14.32 6.872 13.352 6.872 12.16C6.872 10.968 7.752 10 8.84 10C9.928 10 10.808 10.968 10.808 12.16C10.808 13.352 9.928 14.32 8.84 14.32ZM15.336 14.32C14.248 14.32 13.368 13.352 13.368 12.16C13.368 10.968 14.248 10 15.336 10C16.424 10 17.304 10.968 17.304 12.16C17.304 13.352 16.424 14.32 15.336 14.32Z"
                fill="white"
              />
            </svg>
            Sign in with Discord
          </button>
        </div>
      </div>
    </div>
  );
} 