<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal">
  
          <header class="modal-header">
            Attendez
          </header>
  
         <section class="modal-body">
            <Spinner :spacing=30 :font-size=20 :line-size=60 message="Veuillez patienter, votre demande sera effectuée"></Spinner>
         </section>
  
          <footer class="modal-footer">
          </footer>
  
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import Spinner from 'vue-simple-spinner'
  export default {
    name: 'modal-component',
    components : {
        Spinner
    },
    methods: {

    }

  };
  </script>
  
  <style scoped>
  
    .modal-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
  
    }
  
    .modal {
      background: #FFFFFF;
      min-width: 700px;
      max-width: 800px;
      max-height: 400px;
    }
  
    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }
  
    .modal-header {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      color: #fd0d0d;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      justify-content: center;
      text-transform: capitalize;
    }
  
    .modal-footer {
      border-top: 1px solid #eeeeee;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  
    .modal-body {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 10px 30px;
      font-size: 18px;
  
    }
  
  
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
      color: #4AAE9B;
      background: transparent;
    }
  
    .modal-footer > .btn-green {
      border: 0px;
      font-size: large;
      width: 100px;
      background-color: green;
      color: white;
      padding: 10px;
      cursor: pointer;
      margin-right: 5px;
    }
  
    .modal-footer > .btn-red {
      border: 0px;
      font-size: large;
      width: 100px;
      background-color: red;
      color: white;
      padding: 10px;
      cursor: pointer;
      margin-left: 5px;
    }
  
  </style>