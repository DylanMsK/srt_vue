<template>
  <v-simple-table>
    <thead>
      <tr>
        <th class="text-left pl-2">날짜</th>
        <th class="text-center">출발역</th>
        <th class="text-center">도착역</th>
        <th class="text-center">어른/아이</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in ticketList" :key="ticket.id">
        <td class="text-left pl-2">{{ ticket.date }}</td>
        <td class="text-center">{{ ticket.dpt }}</td>
        <td class="text-center">{{ ticket.arr }}</td>
        <td class="text-center">{{ ticket.adult }} / {{ ticket.child }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    ticketList: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped>
.v-data-table thead tr th {
  width: 10%;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgba(250, 250, 250, 1);
}
.v-data-table tbody tr td {
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgba(250, 250, 250, 1);
}
</style>
