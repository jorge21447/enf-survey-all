
const CommentInput = ({ comment, handleComment }) => {
  return (
    <textarea
        className="h-auto disabled:hover:border-none w-full
            disabled:hover:ring-0 hover:ring-1  font-mont hover:ring-slate-300 py-3 outline-none  placeholder-slate-300 text-black   focus:outline-none focus:ring-teal-300 focus:ring-2 focus:border-none rounded-lg p-2 dark:text-gray-300"
        onChange={handleComment}
        placeholder="Comentario"
        value={comment}
      >
      </textarea>
  )
}

export default CommentInput