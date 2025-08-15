<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class DashboardService
{
    /**
     * Get posts created by a specific user.
     *
     * @param User $user
     * @return Collection
     */
    public function getPostsByUser(User $user): Collection
    {
        return Post::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->get();
    }
}