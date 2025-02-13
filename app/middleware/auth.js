export default function ({ store, redirect, params }) {
    // Check if the user is authenticated
    if (!store.getters["user/isAuthenticated"]) {
      return redirect("/login");
    }
  
    // Optionally: Check if the user can access this profile
    const userId = store.getters["user/getUser"]?.id;
    if (params.userId !== userId) {
      return redirect(`/profile/${userId}`);
    }
  }
  