<template>
    <div class="flex flex-col lg:flex-row w-full">
        <!-- Mobile Navigation -->
        <div class="lg:hidden flex justify-between bg-white p-4 border-b">
            <button class="text-emerald-600 font-medium" @click="activeSection = 'announcements'">
                Announcements
            </button>
            <button class="text-emerald-600 font-medium" @click="activeSection = 'suggestions'">
                Suggestions
            </button>
        </div>

        <!-- Left Sidebar -->
        <div v-if="!isMobile || activeSection === 'announcements'"
            class="w-full lg:w-1/4 bg-white hidden px-2 lg:block lg:max-h-screen overflow-y-auto">
            <div class="sticky top-20 ">
                <Announcement />
                <ScrollingPromotions />

                <button v-if="isMobile" class="mt-4 text-emerald-600" @click="activeSection = null">
                    Back to Feed
                </button>
            </div>
        </div>

        <!-- Main Feed -->
        <div v-if="!isMobile || !activeSection" class="flex-grow overflow-y-auto hidden lg:block lg:w-1/2 max-h-screen bg-white">
            <div class="max-w-2xl mx-auto p-4 space-y-6">
                <FeedCard v-for="property in filteredProperties" :key="property.id" :property="property" />
                <div v-if="isLoading" class="flex justify-center p-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            </div>
        </div>

        <!-- Right Sidebar -->
        <div v-if="!isMobile || activeSection === 'suggestions'"
            class="w-full lg:w-1/4 bg-white hidden lg:block lg:max-h-screen overflow-y-auto">
            <div class="sticky top-20 ">
                <Suggestion />
                <Recommendation />

                <button v-if="isMobile" class="mt-4 text-emerald-600" @click="activeSection = null">
                    Back to Feed
                </button>
            </div>
        </div>

        <!-- mobile feeds -->

        <div class="flex flex-col lg:flex-row w-full lg:hidden justify-center">

            <!-- Left Sidebar -->
            <div v-if="activeSection === 'announcements'"
                class="w-full lg:w-1/4 bg-white overflow-y-auto justify-center items-center px-5">
                <button class="mt-4 w-full flex space-x-5 items-center justify-end py-2 px-3 text-emerald-600" @click="activeSection = null">
                    Back to Feed <i class="fas fa-chevron-right px-5"></i>
                    </button>
                <div class="sticky top-20 ">
                    <Announcement />
                    <ScrollingPromotions />

                    
                </div>
            </div>

            <!-- Main Feed -->
            <div v-if="!activeSection" class="flex-grow overflow-y-auto lg:w-1/2 max-h-screen bg-white">
                <div class="max-w-2xl mx-auto p-4 space-y-6">
                    <FeedCard v-for="property in filteredProperties" :key="property.id" :property="property" />
                    <div v-if="isLoading" class="flex justify-center p-4">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar -->
            <div v-if="activeSection === 'suggestions'"
                class="w-full lg:w-1/4 bg-white lg:max-h-screen overflow-y-auto  justify-center items-end px-5">
                <button  class="mt-4 flex space-x-5 px-5 items-center justify-center py-2 text-emerald-600" @click="activeSection = null">
                    <i class="fas fa-chevron-left px-5"></i>
                    Back to Feed
                    </button>
                <div class="sticky top-20 ">
                    <Suggestion />
                    <Recommendation />    
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { ref, computed, onMounted, watch } from 'vue'
import FeedCard from './FeedCard.vue'
import Suggestion from './Suggestion.vue';
import Announcement from './Announcement.vue'
import ScrollingPromotions from './ScrollingPromotions.vue'
import Recommendation from './Recommendation.vue';

export default {
    name: 'FeedStructure',
    components: {
        FeedCard,
        Suggestion,
        Announcement,
        ScrollingPromotions,
        Recommendation
    },

    props: {
        selectedCategory: {
            type: String,
            required: true
        }
    },

    setup(props) {
        // Local state
        const activeSection = ref(null)
        const isLoading = ref(false)
        const localSelectedCategory = ref(props.selectedCategory)
        const minPrice = ref('')
        const maxPrice = ref('')

        // Categories
        const categories = ['Apartment', 'House', 'Villa', 'Office', 'Land']

        // Properties data
        const properties = ref([
            {
                "id": 1,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "house",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 3,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "John Doe", "userAvatar": "/images/profile.png", "text": "Looks amazing!" },
                    { "userName": "Alice Wonder", "userAvatar": "/images/profile.png", "text": "I love this place!" },
                    { "userName": "Tom Hardy", "userAvatar": "/images/profile.png", "text": "Is it available for rent?" }
                ]
            },
            {
                "id": 2,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "apartment",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 2,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "Jane Doe", "userAvatar": "/images/profile.png", "text": "Beautiful view!" },
                    { "userName": "Robert Smith", "userAvatar": "/images/profile.png", "text": "Perfect for families!" }
                ]
            },

            {
                "id": 3,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "apartment",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 1,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "Emily Clark", "userAvatar": "/images/profile.png", "text": "Can I schedule a visit?" }
                ]
            },
            {
                "id": 4,
                "userName": "James Smith",
                "userAvatar": "/images/profile.png",
                "location": "Suburban Area",
                "category": "house",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 95,
                "commentsCount": 5,
                "topLikers": [
                    { "name": "Alice Johnson", "avatar": "/images/profile.png" },
                    { "name": "David Lee", "avatar": "/images/profile.png" }
                ],
                "price": 350000,
                "period": "month",
                "details": {
                    "bedrooms": 4,
                    "bathrooms": 3,
                    "area": 200
                },
                "description": "Spacious house with a large backyard and modern design.",
                "comments": [
                    { "userName": "Sophia Turner", "userAvatar": "/images/profile.png", "text": "Perfect for family gatherings!" },
                    { "userName": "Lucas Gray", "userAvatar": "/images/profile.png", "text": "I love the garden!" }
                ]
            },
            {
                "id": 5,
                "userName": "Mia Johnson",
                "userAvatar": "/images/profile.png",
                "location": "City Center",
                "category": "villa",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 150,
                "commentsCount": 2,
                "topLikers": [
                    { "name": "Emma Watson", "avatar": "/images/profile.png" },
                    { "name": "Tom Holland", "avatar": "/images/profile.png" }
                ],
                "price": 600000,
                "period": "month",
                "details": {
                    "bedrooms": 5,
                    "bathrooms": 4,
                    "area": 350
                },
                "description": "Luxurious villa with a private pool and stunning views.",
                "comments": [
                    { "userName": "Chris Hemsworth", "userAvatar": "/images/profile.png", "text": "Incredible design!" },
                    { "userName": "Natalie Portman", "userAvatar": "/images/profile.png", "text": "A dream come true!" }
                ]
            },
            {
                "id": 6,
                "userName": "Oliver Brown",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "hotel",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 200,
                "commentsCount": 10,
                "topLikers": [
                    { "name": "Scarlett Johansson", "avatar": "/images/profile.png" },
                    { "name": "Chris Evans", "avatar": "/images/profile.png" }
                ],
                "price": 300,
                "period": "night",
                "details": {
                    "bedrooms": 50,
                    "bathrooms": 50,
                    "area": 5000
                },
                "description": "Elegant hotel in the heart of the city with excellent amenities.",
                "comments": [
                    { "userName": "Emma Stone", "userAvatar": "/images/profile.png", "text": "Best hotel experience!" },
                    { "userName": "Robert Downey", "userAvatar": "/images/profile.png", "text": "Highly recommended!" }
                ]
            },
            {
                "id": 7,
                "userName": "Liam Green",
                "userAvatar": "/images/profile.png",
                "location": "Business District",
                "category": "office",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 120,
                "commentsCount": 1,
                "topLikers": [
                    { "name": "Jennifer Aniston", "avatar": "/images/profile.png" },
                    { "name": "Brad Pitt", "avatar": "/images/profile.png" }
                ],
                "price": 2500,
                "period": "month",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 2,
                    "area": 150
                },
                "description": "Modern office space with all necessary facilities.",
                "comments": [
                    { "userName": "Emma Watson", "userAvatar": "/images/profile.png", "text": "Perfect for startups!" }
                ]
            },
            {
                "id": 8,
                "userName": "Ella White",
                "userAvatar": "/images/profile.png",
                "location": "Coastal Area",
                "category": "short_term",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 80,
                "commentsCount": 3,
                "topLikers": [
                    { "name": "Robert Pattinson", "avatar": "/images/profile.png" },
                    { "name": "Kristen Stewart", "avatar": "/images/profile.png" }
                ],
                "price": 150,
                "period": "night",
                "details": {
                    "bedrooms": 1,
                    "bathrooms": 1,
                    "area": 50
                },
                "description": "Charming short-term rental near the beach.",
                "comments": [
                    { "userName": "Daniel Craig", "userAvatar": "/images/profile.png", "text": "Perfect for a quick getaway!" },
                    { "userName": "Gal Gadot", "userAvatar": "/images/profile.png", "text": "Loved my stay here!" }
                ]
            },
            {
                "id": 9,
                "userName": "Sophia Brown",
                "userAvatar": "/images/profile.png",
                "location": "Urban Area",
                "category": "conference",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 110,
                "commentsCount": 4,
                "topLikers": [
                    { "name": "Chris Pratt", "avatar": "/images/profile.png" },
                    { "name": "Tom Hiddleston", "avatar": "/images/profile.png" }
                ],
                "price": 500,
                "period": "day",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 2,
                    "area": 300
                },
                "description": "Spacious conference room ideal for corporate events.",
                "comments": [
                    { "userName": "Emma Stone", "userAvatar": "/images/profile.png", "text": "Great facilities!" },
                    { "userName": "Robert Downey", "userAvatar": "/images/profile.png", "text": "Very professional staff!" }
                ]
            },
            {
                "id": 10,
                "userName": "Benjamin Lee",
                "userAvatar": "/images/profile.png",
                "location": "Rural Area",
                "category": "warehouse",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 70,
                "commentsCount": 2,
                "topLikers": [
                    { "name": "Emma Stone", "avatar": "/images/profile.png" },
                    { "name": "Chris Pratt", "avatar": "/images/profile.png" }
                ],
                "price": 3000,
                "period": "month",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 1,
                    "area": 500
                },
                "description": "Large warehouse with ample storage space, perfect for businesses.",
                "comments": [
                    { "userName": "Natalie Portman", "userAvatar": "/images/profile.png", "text": "Great location for logistics!" }
                ]
            },
            {
                "id": 11,
                "userName": "Charlotte Davis",
                "userAvatar": "/images/profile.png",
                "location": "Mountain Area",
                "category": "seasonal",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 120,
                "commentsCount": 3,
                "topLikers": [
                    { "name": "Tom Hiddleston", "avatar": "/images/profile.png" },
                    { "name": "Scarlett Johansson", "avatar": "/images/profile.png" }
                ],
                "price": 200,
                "period": "night",
                "details": {
                    "bedrooms": 2,
                    "bathrooms": 1,
                    "area": 75
                },
                "description": "Charming seasonal rental for winter sports enthusiasts.",
                "comments": [
                    { "userName": "Chris Evans", "userAvatar": "/images/profile.png", "text": "Perfect for ski trips!" },
                    { "userName": "Emma Watson", "userAvatar": "/images/profile.png", "text": "Loved the cozy atmosphere!" }
                ]
            },
            {
                "id": 12,
                "userName": "Isabella Harris",
                "userAvatar": "/images/profile.png",
                "location": "Urban Area",
                "category": "shared_room",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 50,
                "commentsCount": 4,
                "topLikers": [
                    { "name": "Daniel Craig", "avatar": "/images/profile.png" },
                    { "name": "Gal Gadot", "avatar": "/images/profile.png" }
                ],
                "price": 500,
                "period": "month",
                "details": {
                    "bedrooms": 1,
                    "bathrooms": 1,
                    "area": 30
                },
                "description": "Affordable shared room in a vibrant neighborhood.",
                "comments": [
                    { "userName": "Emily Clark", "userAvatar": "/images/profile.png", "text": "Great for students!" },
                    { "userName": "Robert Pattinson", "userAvatar": "/images/profile.png", "text": "Convenient location!" }
                ]
            },
            {
                "id": 13,
                "userName": "Ava Martinez",
                "userAvatar": "/images/profile.png",
                "location": "Coastal Area",
                "category": "banquet",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 90,
                "commentsCount": 6,
                "topLikers": [
                    { "name": "Chris Hemsworth", "avatar": "/images/profile.png" },
                    { "name": "Scarlett Johansson", "avatar": "/images/profile.png" }
                ],
                "price": 1500,
                "period": "event",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 3,
                    "area": 400
                },
                "description": "Elegant banquet hall for weddings and special events.",
                "comments": [
                    { "userName": "Emma Stone", "userAvatar": "/images/profile.png", "text": "Perfect for our wedding!" },
                    { "userName": "Liam White", "userAvatar": "/images/profile.png", "text": "Beautiful decor!" }
                ]
            },
            {
                "id": 14,
                "userName": "Ethan Wilson",
                "userAvatar": "/images/profile.png",
                "location": "City Center",
                "category": "theater",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 300,
                "commentsCount": 8,
                "topLikers": [
                    { "name": "Natalie Portman", "avatar": "/images/profile.png" },
                    { "name": "Tom Hiddleston", "avatar": "/images/profile.png" }
                ],
                "price": 5000,
                "period": "event",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 5,
                    "area": 1000
                },
                "description": "Grand theater for performances and shows.",
                "comments": [
                    { "userName": "Chris Evans", "userAvatar": "/images/profile.png", "text": "Amazing acoustics!" },
                    { "userName": "Emma Watson", "userAvatar": "/images/profile.png", "text": "A must-visit for theater lovers!" }
                ]
            }, {
                "id": 15,
                "userName": "Oliver Taylor",
                "userAvatar": "/images/profile.png",
                "location": "Riverside",
                "category": "coworking",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 80,
                "commentsCount": 5,
                "topLikers": [
                    { "name": "Emma Roberts", "avatar": "/images/profile.png" },
                    { "name": "Daniel Craig", "avatar": "/images/profile.png" }
                ],
                "price": 300,
                "period": "month",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 2,
                    "area": 200
                },
                "description": "Modern coworking space with all amenities included.",
                "comments": [
                    { "userName": "Ava Green", "userAvatar": "/images/profile.png", "text": "Great environment for creativity!" },
                    { "userName": "Liam White", "userAvatar": "/images/profile.png", "text": "Love the vibe here!" }
                ]
            },
            {
                "id": 16,
                "userName": "Lucas Brown",
                "userAvatar": "/images/profile.png",
                "location": "Forest Area",
                "category": "event_hall",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 140,
                "commentsCount": 7,
                "topLikers": [
                    { "name": "Natalie Portman", "avatar": "/images/profile.png" },
                    { "name": "Tom Hiddleston", "avatar": "/images/profile.png" }
                ],
                "price": 2000,
                "period": "event",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 1,
                    "area": 600
                },
                "description": "Spacious event hall perfect for conferences and gatherings.",
                "comments": [
                    { "userName": "Emma Stone", "userAvatar": "/images/profile.png", "text": "Fantastic location for events!" },
                    { "userName": "Chris Evans", "userAvatar": "/images/profile.png", "text": "Highly recommend for large gatherings!" }
                ]
            },
            {
                "id": 17,
                "userName": "Sophia Lee",
                "userAvatar": "/images/profile.png",
                "location": "Central Park",
                "category": "studio",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 65,
                "commentsCount": 2,
                "topLikers": [
                    { "name": "Robert Pattinson", "avatar": "/images/profile.png" },
                    { "name": "Emma Watson", "avatar": "/images/profile.png" }
                ],
                "price": 1200,
                "period": "month",
                "details": {
                    "bedrooms": 1,
                    "bathrooms": 1,
                    "area": 45
                },
                "description": "Cozy studio apartment in a vibrant neighborhood.",
                "comments": [
                    { "userName": "Chris Hemsworth", "userAvatar": "/images/profile.png", "text": "Perfect for young professionals!" }
                ]
            },
            {
                "id": 18,
                "userName": "Mason White",
                "userAvatar": "/images/profile.png",
                "location": "Suburban Area",
                "category": "factory",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 90,
                "commentsCount": 4,
                "topLikers": [
                    { "name": "Emma Roberts", "avatar": "/images/profile.png" },
                    { "name": "Tom Holland", "avatar": "/images/profile.png" }
                ],
                "price": 5000,
                "period": "month",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 2,
                    "area": 1000
                },
                "description": "Large factory space with loading docks and office areas.",
                "comments": [
                    { "userName": "Natalie Portman", "userAvatar": "/images/profile.png", "text": "Ideal for manufacturing!" },
                    { "userName": "Chris Evans", "userAvatar": "/images/profile.png", "text": "Great facilities!" }
                ]
            },
            {
                "id": 19,
                "userName": "Ava Johnson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "exhibition",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 110,
                "commentsCount": 6,
                "topLikers": [
                    { "name": "Emma Watson", "avatar": "/images/profile.png" },
                    { "name": "Daniel Craig", "avatar": "/images/profile.png" }
                ],
                "price": 3000,
                "period": "event",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 2,
                    "area": 800
                },
                "description": "Versatile exhibition space for art shows and presentations.",
                "comments": [
                    { "userName": "Gal Gadot", "userAvatar": "/images/profile.png", "text": "Perfect for art lovers!" },
                    { "userName": "Chris Hemsworth", "userAvatar": "/images/profile.png", "text": "Well-designed space!" }
                ]
            },
            {
                "id": 20,
                "userName": "Liam Green",
                "userAvatar": "/images/profile.png",
                "location": "Countryside",
                "category": "wedding_venue",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 150,
                "commentsCount": 9,
                "topLikers": [
                    { "name": "Scarlett Johansson", "avatar": "/images/profile.png" },
                    { "name": "Chris Evans", "avatar": "/images/profile.png" }
                ],
                "price": 4000,
                "period": "event",
                "details": {
                    "bedrooms": 0,
                    "bathrooms": 3,
                    "area": 1000
                },
                "description": "Beautiful wedding venue surrounded by nature.",
                "comments": [
                    { "userName": "Emma Stone", "userAvatar": "/images/profile.png", "text": "Perfect for a dreamy wedding!" },
                    { "userName": "Tom Hiddleston", "userAvatar": "/images/profile.png", "text": "Amazing views!" }
                ]
            },
            {
                "id": 21,
                "userName": "Sophia Brown",
                "userAvatar": "/images/profile.png",
                "location": "Short-Term Rentals",
                "category": "short_term",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 130,
                "commentsCount": 4,
                "topLikers": [
                    { "name": "Dwayne Johnson", "avatar": "/images/profile.png" },
                    { "name": "Scarlett Johansson", "avatar": "/images/profile.png" }
                ],
                "price": 150,
                "period": "night",
                "details": {
                    "bedrooms": 2,
                    "bathrooms": 1,
                    "area": 80
                },
                "description": "Cozy short-term rental in a great location.",
                "comments": [
                    { "userName": "Chris Evans", "userAvatar": "/images/profile.png", "text": "Great place for a weekend!" },
                    { "userName": "Natalie Portman", "userAvatar": "/images/profile.png", "text": "I had an amazing stay!" },
                    { "userName": "Mark Ruffalo", "userAvatar": "/images/profile.png", "text": "Is parking available?" },
                    { "userName": "Tom Hiddleston", "userAvatar": "/images/profile.png", "text": "Highly recommend this rental!" }
                ]
            },
            {
                "id": 22,
                "userName": "Liam White",
                "userAvatar": "/images/profile.png",
                "location": "Long-Term Rentals",
                "category": "long_term",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 160,
                "commentsCount": 3,
                "topLikers": [
                    { "name": "Jennifer Aniston", "avatar": "/images/profile.png" },
                    { "name": "Brad Pitt", "avatar": "/images/profile.png" }
                ],
                "price": 1200,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Spacious long-term rental with all utilities included.",
                "comments": [
                    { "userName": "Scarlett Johansson", "userAvatar": "/images/profile.png", "text": "Perfect for a family!" },
                    { "userName": "Chris Hemsworth", "userAvatar": "/images/profile.png", "text": "Is it pet-friendly?" },
                    { "userName": "Emma Watson", "userAvatar": "/images/profile.png", "text": "What are the lease terms?" }
                ]
            },
            {
                "id": 23,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "house",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 3,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "John Doe", "userAvatar": "/images/profile.png", "text": "Looks amazing!" },
                    { "userName": "Alice Wonder", "userAvatar": "/images/profile.png", "text": "I love this place!" },
                    { "userName": "Tom Hardy", "userAvatar": "/images/profile.png", "text": "Is it available for rent?" }
                ]
            },
            {
                "id": 24,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "apartment",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 2,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "Jane Doe", "userAvatar": "/images/profile.png", "text": "Beautiful view!" },
                    { "userName": "Robert Smith", "userAvatar": "/images/profile.png", "text": "Perfect for families!" }
                ]
            },

            {
                "id": 25,
                "userName": "Sarah Wilson",
                "userAvatar": "/images/profile.png",
                "location": "Downtown Area",
                "category": "apartment",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 124,
                "commentsCount": 1,
                "topLikers": [
                    { "name": "Mike Johnson", "avatar": "/images/profile.png" },
                    { "name": "Emma Smith", "avatar": "/images/profile.png" },
                    { "name": "David Brown", "avatar": "/images/profile.png" }
                ],
                "price": 250000,
                "period": "month",
                "details": {
                    "bedrooms": 3,
                    "bathrooms": 2,
                    "area": 120
                },
                "description": "Luxurious apartment with modern amenities in the heart of downtown.",
                "comments": [
                    { "userName": "Emily Clark", "userAvatar": "/images/profile.png", "text": "Can I schedule a visit?" }
                ]
            },
            {
                "id": 26,
                "userName": "James Smith",
                "userAvatar": "/images/profile.png",
                "location": "Suburban Area",
                "category": "house",
                "images": [
                    "/images/home/hero/hero1.jpg",
                    "/images/home/hero/hero2.jpg",
                    "/images/home/hero/hero3.jpg",
                    "/images/home/hero/hero4.jpg"
                ],
                "likesCount": 95,
                "commentsCount": 5,
                "topLikers": [
                    { "name": "Alice Johnson", "avatar": "/images/profile.png" },
                    { "name": "David Lee", "avatar": "/images/profile.png" }
                ],
                "price": 350000,
                "period": "month",
                "details": {
                    "bedrooms": 4,
                    "bathrooms": 3,
                    "area": 200
                },
                "description": "Spacious house with a large backyard and modern design.",
                "comments": [
                    { "userName": "Sophia Turner", "userAvatar": "/images/profile.png", "text": "Perfect for family gatherings!" },
                    { "userName": "Lucas Gray", "userAvatar": "/images/profile.png", "text": "I love the garden!" }
                ]
            },
        ]);


        // Computed properties
        const filteredProperties = computed(() => {
            let filtered = properties.value

            // Filter by category
            if (localSelectedCategory.value) {
                filtered = filtered.filter(property =>
                    property.category.toLowerCase() === localSelectedCategory.value.toLowerCase()
                )
            }

            // Filter by price
            if (minPrice.value) {
                filtered = filtered.filter(property => property.price >= Number(minPrice.value))
            }
            if (maxPrice.value) {
                filtered = filtered.filter(property => property.price <= Number(maxPrice.value))
            }

            return filtered
        })

        // Watch for prop changes
        watch(() => props.selectedCategory, (newValue) => {
            localSelectedCategory.value = newValue
        })

        // Methods
        const showSection = (section) => {
            activeSection.value = section
        }

        const backToCenter = () => {
            activeSection.value = null
        }

        const loadMoreProperties = () => {
            isLoading.value = true
            setTimeout(() => {
                isLoading.value = false
            }, 1000)
        }


        const isMobile = ref(false);

        // Check for mobile viewport
        const checkMobile = () => {
            isMobile.value = window.innerWidth < 1024;
        };

        onMounted(() => {
            checkMobile();
            window.addEventListener('resize', checkMobile);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', checkMobile);
        });



        // Infinite scroll handler
        const handleScroll = (e) => {
            const element = e.target;
            if (
                element.scrollHeight - element.scrollTop === element.clientHeight &&
                !isLoading.value
            ) {
                loadMore();
            }
        };

        const loadMore = () => {
            isLoading.value = true;
            // Add your loading logic here
            setTimeout(() => {
                isLoading.value = false;
            }, 1000);
        };



        // Lifecycle hooks
        onMounted(() => {
            document.querySelector('#center')?.addEventListener('scroll', handleScroll)
        })

        return {
            activeSection,
            filteredProperties,
            categories,
            localSelectedCategory,
            minPrice,
            maxPrice,
            isLoading,
            showSection,
            backToCenter
        }
    }
}
</script>

<style scoped>
button {
    transition: background-color 0.3s, transform 0.2s;
}

button:hover {
    background-color: #e2e8f0;
    transform: scale(1.05);
}

#center {
    scroll-behavior: smooth;
}

.property-feed {
    -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
    display: none;
}
</style>