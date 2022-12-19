<template>
  <q-page>
    <div class="row">
    <q-table
      title="Treats"
      :rows="gets"
      :columns="columns"
      row-key="name"
      class="col"
    />
  </div>

  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:63893/Api/'
});
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
       columns : [
         {
            name: 'title',
            // required: true, coluna obrigatória
            label: 'Titulo',
            align: 'left',
            field: row => row.title,
            format: val => `${val}`,
            sortable: true
        },
        {
            name: 'title',
            // required: true, coluna obrigatória
            label: 'category',
            align: 'left',
            field: 'category',
            format: val => `${val}`,
            sortable: true
        },
      ],
      gets: []
    }
  },
  mounted () {
    this.getGets()

  },
  methods: {
    getGets () {
      api.get("Movie/GetMovies")
      .then((res) => {
        this.gets = res.data.data;
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log("AAAAAAAAAAAAA",err)
      })
    }
  }
});
</script>
