"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"

/* -------------------------------------------------------------------------- */
/* Types */
/* -------------------------------------------------------------------------- */
type PostStatus = "draft" | "published"

interface Post {
  id: number
  title: string
  status: PostStatus
}

/* -------------------------------------------------------------------------- */
/* Component */
/* -------------------------------------------------------------------------- */
export default function BlogAdminPanel() {
  /* ---------------------------------- State --------------------------------- */
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "First post", status: "published" },
    { id: 2, title: "Second post", status: "draft" },
  ])

  /* ----------------------------- Event Handlers ----------------------------- */
  const handleCreate = () => {
    const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
    setPosts((prev) => [...prev, { id: nextId, title: `New post ${nextId}`, status: "draft" }])
  }

  const handleEdit = (id: number) => {
    // Replace with real edit logic (e.g., open modal or navigate)
    alert(`Edit post #${id}`)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  /* ---------------------------------- UI ------------------------------------ */
  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-lg font-semibold">Blog Admin Panel</CardTitle>

        <Button onClick={handleCreate} variant="outline" className="bg-green-600 text-white hover:bg-green-700">
          <Plus size={16} className="mr-2" />
          New Post
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left sr-only">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t last:border-b [&_td]:py-2 [&_td]:px-4">
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <span
                    className={
                      post.status === "published"
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                        : "rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800"
                    }
                  >
                    {post.status}
                  </span>
                </td>
                <td className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(post.id)}
                    aria-label={`Edit ${post.title}`}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDelete(post.id)}
                    aria-label={`Delete ${post.title}`}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
