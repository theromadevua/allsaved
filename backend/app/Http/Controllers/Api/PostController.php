<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PostController extends Controller
{
    use AuthorizesRequests;

    /**
     * @var PostService
     */
    protected $postService;

    public function __construct(
        PostService $postService
    ) {
        $this->postService = $postService;
    }

    /**
     * Display a paginated listing of posts.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 3);
        $page = $request->get('page', 1);
        
        $paginatedPosts = $this->postService->getPaginatedPosts($perPage, $page);

        return new JsonResponse([
            'message' => 'Posts retrieved successfully',
            'data' => $paginatedPosts->items(),
            'pagination' => [
                'current_page' => $paginatedPosts->currentPage(),
                'last_page' => $paginatedPosts->lastPage(),
                'per_page' => $paginatedPosts->perPage(),
                'total' => $paginatedPosts->total(),
                'from' => $paginatedPosts->firstItem(),
                'to' => $paginatedPosts->lastItem(),
                'has_more' => $paginatedPosts->hasMorePages(),
            ],
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Store a newly created post.
     *
     * @param PostRequest $request
     * @return JsonResponse
     */
    public function store(PostRequest $request): JsonResponse
    {
        $post = $this->postService->createPost(auth()->user(), $request->validated());
        $post->load('user');

        return new JsonResponse([
            'message' => 'Post created successfully',
            'data' => $post,
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Display the specified post.
     *
     * @param Post $post
     * @return JsonResponse
     */
    public function show(Post $post): JsonResponse
    {
        $post = $this->postService->getPost($post);

        return new JsonResponse([
            'message' => 'Post retrieved successfully',
            'data' => $post,
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Update the specified post.
     *
     * @param PostRequest $request
     * @param Post $post
     * @return JsonResponse
     */
    public function update(PostRequest $request, Post $post): JsonResponse
    {
        $this->authorize('update', $post);
        $post = $this->postService->updatePost($post, $request->validated());

        return new JsonResponse([
            'message' => 'Post updated successfully',
            'data' => $post,
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Remove the specified post.
     *
     * @param Post $post
     * @return JsonResponse
     */
    public function destroy(Post $post): JsonResponse
    {
        $this->authorize('delete', $post);
        $this->postService->deletePost($post);

        return new JsonResponse([
            'message' => 'Post deleted successfully',
        ], JsonResponse::HTTP_NO_CONTENT);
    }
}