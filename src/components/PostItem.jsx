import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, deletePost } from '../api.js'; // api.js에서 함수 가져오기

function PostItem({ post }) {
  const queryClient = useQueryClient();

  // 1. 좋아요 mutation 정의
  const likeMutation = useMutation({
    mutationFn: () => likePost(post), // 또는 likePost 함수 형태에 맞게 전달
    onSuccess: () => {
      // 성공 시 'posts' 쿼리를 무효화하여 헤더 합계 및 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 2. 삭제 mutation 정의
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <li className="post-item">
      <div className="post-info">
        <strong>{post.title}</strong>
        <p>작성자 {post.author} · {post.date}</p>
      </div>
      <div className="post-actions">
        {/* 요청 중(isPending)에는 버튼이 중복 클릭되지 않도록 disabled 처리 */}
        <button 
          type="button" 
          onClick={() => likeMutation.mutate()} 
          disabled={likeMutation.isPending}
        >
          좋아요 {post.likes}
        </button>
        <button 
          type="button" 
          onClick={() => deleteMutation.mutate()} 
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default PostItem;