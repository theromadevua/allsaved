<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PostService
{
    /**
     * Count posts created by a specific user.
     *
     * @param User $user
     * @return int
     */
    public function countPostsByUser(User $user): int
    {
        return $user->posts()->count();
    }

    /**
     * Get the latest post created by a specific user.
     *
     * @param User $user
     * @return Post|null
     */
    public function getLatestPostByUser(User $user): ?Post
    {
        return $user->posts()->latest()->first();
    }

    /**
     * Retrieve all posts with their associated users.
     *
     * @return Collection
     */
    public function getAllPosts(): Collection
    {
        return Post::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Retrieve paginated posts with their associated users.
     *
     * @param int $perPage
     * @param int $page
     * @return LengthAwarePaginator
     */
    public function getPaginatedPosts(int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Post::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Create a new post for the authenticated user.
     *
     * @param User $user
     * @param array $data
     * @return Post
     */
    public function createPost(User $user, array $data): Post
    {
        return $user->posts()->create($data);
    }

    /**
     * Retrieve a specific post with its associated user.
     *
     * @param Post $post
     * @return Post
     */
    public function getPost(Post $post): Post
    {
        return $post->load('user');
    }

    /**
     * Update an existing post.
     *
     * @param Post $post
     * @param array $data
     * @return Post
     */
    public function updatePost(Post $post, array $data): Post
    {
        $post->update($data);
        $post->load('user');

        return $post;
    }

    /**
     * Delete a post.
     *
     * @param Post $post
     * @return void
     */
    public function deletePost(Post $post): void
    {
        $post->delete();
    }
}