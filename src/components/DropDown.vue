<template>
  <div class="drop-down"
  >
    <input
      @blur="showOptionsSettings(false)"
      @focus="showOptionsSettings(true)"
      @keydown.esc="showOptionsSettings(false)"
      @keydown.up="previousDropDownElementIndex" 
      @keydown.down="nextDropDownElementIndex"
      @keydown.enter="chooseAnOptionByEnter"
      @input="showAllOptions"
      type="text"
      class="drop-down__input"
      placeholder="Select a city" 
      v-model="inputValue"
    >
    <button
      class="drop-down-close"
      @click="clearInput"
      v-if="inputValue != ''"
    >
      X
    </button>
    <ul 
      class="drop-down__list"
      v-if="showOptions"
      ref="results"
    >
      <template 
        v-if="filterElement.length != 0"
      >
        <li
          v-for="(element,index) in filterElement" 
          :key="index"
          @mouseenter="changeDropDownElementIndex(index)"
          @mousedown.prevent="showOptions = true"
          @click.prevent="chooseAnOption(element)"
          class="drop-down__list-element"
          :class="{'drop-down__list-element--active':index == dropDownElementIndex}"
        >
          {{ element }}
        </li>
      </template>
      <template v-else>
        <li
          class="drop-down__list-element"
        >
          No results for {{ inputValue }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
    name:"DropDown",
    data:()=>({
      inputValue:'',
      showOptions:false,
      showCloseButton:false,
      menuButton:undefined,
      dropDownElementIndex:0
    }),
    props:{
      cities:{
        type:Array,
        default:()=>([])
      }
    },
    computed:{
      filterElement(){
        return Object.values(this.cities).filter(item =>{
          return item.toLowerCase().includes(this.inputValue.toLowerCase())
        }).slice(0,101)
      }
    },
    methods:{
      showAllOptions(){
        this.showOptionsSettings(true)
      },
      chooseAnOption(data){
        this.inputValue = data;
        this.showOptionsSettings(false)
        this.showCloseButton = true;
        this.dropDownElementIndex = 0;
      },
      clearInput(){
        this.inputValue = ''
        this.showCloseButton = false
      },
      previousDropDownElementIndex(){
        if(this.dropDownElementIndex < 1){
          this.dropDownElementIndex = 0
        }else{
          this.dropDownElementIndex = this.dropDownElementIndex - 1
          this.$refs.results.children[this.dropDownElementIndex].scrollIntoView({block:'nearest'})
        }
      },
      nextDropDownElementIndex(){
        if(this.dropDownElementIndex >= this.filterElement.length){
          this.dropDownElementIndex = this.filterElement.length -1
        }else{
          this.dropDownElementIndex = this.dropDownElementIndex + 1
          this.$refs.results.children[this.dropDownElementIndex].scrollIntoView({block:'nearest'})
        }
      },
      chooseAnOptionByEnter(){
        this.inputValue=this.filterElement[this.dropDownElementIndex]
        this.showCloseButton = true;
        this.showOptions = false;
      },
      changeDropDownElementIndex(index){
        this.dropDownElementIndex = index
      },
      showOptionsSettings(boolean){
        this.showOptions = boolean
      }
    }

}
</script>

<style lang="scss" scoped>
.drop-down{
  position: relative;
}
.drop-down::before{
  position: absolute;
  content:"";
  width: 10px;
  height: 5px;
  background-image: url('../assets/images/arrow-bottom.svg');
  background-repeat: no-repeat;
  background-size: cover;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.drop-down__input,
.drop-down__list{
  background: #FFFFFF;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: none;
  padding: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
  width: 280px;
  outline:none;
}
.drop-down__list{
  list-style: none;
  position: absolute;
  height: 200px;
  top: 68px;
  left: 0;
  overflow: auto;
  margin: 0;
  padding: 0;
  padding: 16px;
}
.drop-down__list-element{
  cursor: pointer;
  margin-bottom: 15px;
  text-transform: capitalize;
}
.drop-down-close{
  font-family: 'Courier New', Courier, monospace;
  font-size: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
}
.drop-down-close::after{
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: red;
  width: 20px;
  height: 20px;
  z-index: -1;
  border-radius: 50%;
}
// .drop-down__list-element:hover{
//     background-color: rgba(blue, 0.2);
// }
.drop-down__list-element--active{
  background-color: rgba(blue, 0.2);
}
</style>
<!-- @click="showAllOptions" -->