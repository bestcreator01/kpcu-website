"use client"

import { useState } from "react"
import { SubPageLayout } from "@/components/sub-page-layout"
import { TablePagination } from "@/components/table-pagination"

const posts: { id: number; title: string; author: string; date: string }[] = []

const ITEMS_PER_PAGE = 10

export default function FreeBoardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE))
  const paginated = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <SubPageLayout category="커뮤니티" title="자유게시판">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {"총 "}{posts.length}{"개의 게시글"}
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-5 py-2.5 grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground border-b border-border">
            <span className="col-span-1">번호</span>
            <span className="col-span-7">제목</span>
            <span className="col-span-2 hidden md:block">작성자</span>
            <span className="col-span-2 hidden md:block text-right">등록일</span>
          </div>

          {paginated.length === 0 ? (
            <div className="px-5 py-10 text-center text-muted-foreground text-sm">
              아직 등록된 게시글이 없습니다.
            </div>
          ) : (
            paginated.map((post) => (
              <div
                key={post.id}
                className="px-5 py-3 grid grid-cols-12 gap-2 items-center border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="col-span-1 text-sm text-muted-foreground">{post.id}</span>
                <span className="col-span-11 md:col-span-7 text-sm text-foreground">{post.title}</span>
                <span className="col-span-2 hidden md:block text-xs text-muted-foreground">{post.author}</span>
                <span className="col-span-2 hidden md:block text-xs text-muted-foreground text-right">{post.date}</span>
              </div>
            ))
          )}
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <p className="text-xs text-muted-foreground text-center">
          게시글 작성은 관리자에게 문의해 주세요.
        </p>
      </div>
    </SubPageLayout>
  )
}
