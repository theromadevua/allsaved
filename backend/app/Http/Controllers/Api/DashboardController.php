<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * @var DashboardService
     */
    protected $dashboardService;

    public function __construct(
        DashboardService $dashboardService
    )
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Get dashboard info for the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getDashboardInfo(Request $request): JsonResponse
    {
        $user = $request->user();
    
        $totalPost = Post::count();
    
        $userPosts = $this->dashboardService
            ->getPostsByUser($user)
            ->sortByDesc('created_at')
            ->values();
    
        return new JsonResponse([
            'message' => 'Dashboard info retrieved successfully',
            'data' => [
                'total_posts' => $totalPost,
                'user_posts'  => $userPosts,
            ],
        ], JsonResponse::HTTP_OK);
    }
    
}