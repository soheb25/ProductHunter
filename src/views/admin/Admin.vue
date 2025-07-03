<template>
  <!-- <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 text-center">🛠️ Admin Dashboard</h1>
    <input v-model="userSearch" type="text" placeholder="Search User" class="border px-3 py-1 rounded mb-4 w-60">
    <div class="grid md:grid-cols-2 gap-8"> -->
  <!-- Users Section -->
  <!-- <div class="bg-white p-6 rounded-xl shadow-lg">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">👤 Registered Users</h2>
          <span class="text-sm bg-gray-200 px-3 py-1 md:rounded-full rounded-md text-gray-600">
            Total: {{ Object.keys(users).length }}
          </span>
        </div>
        <ul class="space-y-2 text-gray-700 text-sm max-h-72 overflow-y-auto">
          <li v-for="(user, name) in filteredUsers" :key="name" class="flex justify-between items-center p-2 rounded hover:bg-gray-100 transition">
            <span><strong>{{ name }}</strong></span>
            <button class="text-red-600 text-xs hover:underline" @click="deleteUser(name)">Delete</button>
          </li>
        </ul>
      </div> -->
  <!-- User Carts -->
  <!-- <div class="bg-white p-6 rounded-xl shadow-lg">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">🛒 User Carts</h2>
          <span class="text-sm bg-gray-200 px-3 py-1 md:rounded-full rounded-md text-gray-600">
            {{ Object.keys(userCarts).length }} Active
          </span>
        </div>
        <div class="space-y-6 max-h-96 overflow-y-auto">
          <div v-for="(items, username) in userCarts" :key="username" class="bg-gray-50 p-4 rounded-xl border">
            <div class="flex justify-between items-center">
              <h3 class="text-blue-600 font-medium">🧑 {{ username }}</h3>
              <button class="text-red-600 text-xs hover:underline" @click="clearCart(username)">Clear</button>
            </div>
            <ul class="ml-4 list-disc text-sm text-gray-600 space-y-1 mt-2">
              <li v-for="item in items" :key="item.id">
                {{ item.title }} - ${{ item.price }} × {{ item.quantity }}
              </li>
            </ul>
            <div class="text-right mt-2 text-sm font-semibold text-gray-800">
              Total: ${{ items.reduce((total, i) => total + i.price * i.quantity, 0).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="exportData" class="bg-blue-600 text-white px-4 py-1 mt-3 rounded text-sm hover:bg-blue-700">Export</button>
  </div> -->
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-60 bg-white shadow-md p-4 flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-blue-600 text-center">Admin</h2>
      <nav class="flex flex-col gap-2">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['text-left px-4 py-2 rounded-lg transition', activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700']">
          {{ tab }}
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <h1 class="text-3xl font-semibold mb-6 text-gray-800">🛠️ {{ activeTab }}</h1>

      <!-- Tab: Dashboard -->
      <section v-if="activeTab === 'Dashboard'" class="space-y-4">
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-bold mb-2">📊 Summary</h2>
          <ul class="space-y-2 text-gray-700">
            <li>Total Registered Users: <strong>{{ Object.keys(users).length }}</strong></li>
            <li>Active User Carts: <strong>{{ Object.keys(userCarts).length }}</strong></li>
            <li>Total Cart Value: <strong>${{ totalCartValue }}</strong></li>
          </ul>
        </div>
      </section>

      <!-- Tab: Users -->
      <section v-if="activeTab === 'Users'" class="space-y-4">
        <input v-model="userSearch" type="text" placeholder="Search User" class="border px-3 py-1 rounded mb-4 w-60">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">👤 Registered Users</h2>
          <ul class="space-y-2 text-gray-700 text-sm max-h-96 overflow-y-auto">
            <li v-for="(user, name) in filteredUsers" :key="name"
              class="flex justify-between items-center p-2 rounded hover:bg-gray-100 transition">
              <span><strong>{{ name }}</strong>
                <span v-if="currentUser === name" class="text-green-600 text-xs ml-2">(You)</span>
              </span>
              <div class="flex gap-2">
                <button @click="loginAsUser(name)" class="text-blue-600 text-xs hover:underline">Login as</button>
                <button @click="deleteUser(name)" class="text-red-600 text-xs hover:underline">Delete</button>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Tab: Carts -->
      <section v-if="activeTab === 'Carts'" class="space-y-4">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">🛒 User Carts</h2>
          <div class="space-y-4 max-h-[30rem] overflow-y-auto">
            <div v-for="(items, username) in userCarts" :key="username" class="bg-gray-50 p-4 rounded-xl border">
              <div class="flex justify-between items-center">
                <h3 class="text-blue-600 font-medium">🧑 {{ username }}</h3>
                <button @click="clearCart(username)" class="text-red-600 text-xs hover:underline">Clear</button>
              </div>
              <ul class="ml-4 list-disc text-sm text-gray-600 space-y-1 mt-2">
                <li v-for="item in items" :key="item.id">
                  {{ item.title }} - ${{ item.price }} × {{ item.quantity }}
                </li>
              </ul>
              <div class="text-right mt-2 text-sm font-semibold text-gray-800">
                Total: ${{items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab: Orders -->
      <section v-if="activeTab === 'Orders'" class="space-y-4">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">🧾 All Orders</h2>
          <div class="space-y-4 max-h-[30rem] overflow-y-auto">
            <div v-for="(orders, username) in allOrders" :key="username" class="border p-4 rounded">
              <h3 class="text-blue-600 font-medium mb-2">🧑 {{ username }}</h3>
              <div v-for="order in orders" :key="order.id" class="bg-gray-50 p-3 rounded mb-2">
                <p class="text-sm mb-1">🗓 {{ formatDate(order.date) }} — Total: <strong>${{ order.total }}</strong></p>
                <ul class="ml-4 list-disc text-sm text-gray-600">
                  <li v-for="item in order.items" :key="item.id">
                    {{ item.title }} × {{ item.quantity }} (${{
                      item.price
                    }})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
import DefaultLayout from '@/layout/DefaultLayout.vue'
export default {
  components : {DefaultLayout},
  data() {
    return {
      tabs: ['Dashboard', 'Users', 'Carts', 'Orders'],
      activeTab: 'Dashboard',
      users: {},
      userCarts: {},
      userSearch: ""
    }
  },
  computed: {
    filteredUsers() {
      if (!this.userSearch) return this.users
      return Object.fromEntries(
        Object.entries(this.users).filter(([name]) => name.toLowerCase().includes(this.userSearch.toLowerCase())
        )
      )
    },
    totalCartValue() {
      return Object.values(this.userCarts)
        .flat()
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
        .toFixed(2)
    },
    allOrders() {
      return JSON.parse(localStorage.getItem('orders') || '{}')
    }
  },
  created() {
    this.loadData()
  },
  currentUser() {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved).username : ''
  },
  methods: {
    loadData() {
      this.users = JSON.parse(localStorage.getItem('users') || '{}')
      this.userCarts = JSON.parse(localStorage.getItem('userCarts') || '{}')
    },
    deleteUser(username) {
      if (confirm(`Delete user "${username}"?`)) {
        const users = JSON.parse(localStorage.getItem('users') || '{}')
        delete users[username]
        localStorage.setItem('users', JSON.stringify(users))
        delete this.users[username]
      }
    },
    clearCart(username) {
      if (confirm(`Clear cart for "${username}"?`)) {
        const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}')
        delete allCarts[username]
        localStorage.setItem('userCarts', JSON.stringify(allCarts))
        delete this.userCarts[username]
      }
    },
    loginAsUser(username) {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      const user = users[username]
      if (user) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
        if (currentUser.username === 'admin') {
          localStorage.setItem('adminSession', JSON.stringify(currentUser))
        }

        localStorage.setItem('currentUser', JSON.stringify({ username }))
        alert(`You are logged in as "${username}"`)
        this.$router.push('/home')
      } else {
        alert('User not found')
      }
    },
    formatDate(datestr) {
      return new Date(datestr).toLocaleString()
    }
    // backToAdmin() {
    //   const adminSession = localStorage.getItem('adminSession')
    //   if(adminSession) {
    //     localStorage.setItem('currentUser' , adminSession)
    //     localStorage.removeItem('adminSession')
    //     alert('Restored Admin Session')
    //     this.$router.push('/admin')
    //   } else {
    //     alert('No Admin Session Found')
    //   }
    // }
    // exportData() {
    //   const data = {
    //     users : this.users,
    //     carts : this.userCarts
    //   }
    //   const blob = new Blob([JSON.stringify(data , null , 2)], {type : '/appplication.json'})
    //   const url = URL.createObjectURL(blob)
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.download = 'admin_data.json'
    //   link.click()
    //   URL.revokeObjectURL(url)
    // }
  }
}
</script>
