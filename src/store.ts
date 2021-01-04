import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testData";
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name:'script kid',
      columnId:1
    },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "script kid" };
    },
    //  新建一个文章
    createPost(state,newPost){
      state.posts.push(newPost)
    }
  },
  actions:{

  },
  getters: {
    //  获取 id > 2 的数据长度
    biggerColumnSlen(state) {
      return state.columns.filter(c => c.id > 2).length;
    },
    //  根据id获取对应的column
    // getColumnById: (state) => (id: number) =>{
    //     return state.columns.find(c => c.id === id)
    // },
    //  es5 写法
    getColumnById:(function (state) {
        return function (id: number){
            return state.columns.find(c => c.id === id)
        }
    }),
    //  根据id获取对应 的list
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid);
    }
  }
});

export default store;
