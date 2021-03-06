import Vue from 'vue';
import Vuex from 'vuex';
import $router from '@/router';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    accessToken: '',
    mission: {
      currentMember: {},
      currentMission: {},
    },
    allMission: {
      currentMember: {},
      currentMission: {},
    },
    event: [],
    locale: null,
    bottomNav: true,
    member: {},
    lastestSelectedMemberId: '',
    test: {
      current: '',
      question: '',
    },
    question: [],
    answer: {
      CTT: {},
      MAT: {},
      PBT: {},
      finished: {
        CTT: false,
        MAT: false,
        PBT: false,
      },
    },
    psycheck: {
      testCode: '',
      currentMember: {},
    },
    result: {
      currentMember: {},
      currentResult: {},
    },
    isFirstVisit: true,
  },
  mutations: {
    SET_VISIT(state, payload) {
      state.isFirstVisit = payload;
    },
    SET_BOTTOM_NAV(state, payload) {
      state.bottomNav = payload;
    },
    SET_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    SET_USER(state, payload) {
      state.currentUser = payload;
    },
    SET_MEMBER(state, payload) {
      state.member = payload;
    },
    SET_LASTESTMEMBER(state, payload) {
      state.lastestSelectedMemberId = payload;
    },
    SET_CURRENT_TEST(state, payload) {
      state.test.current = payload;
    },
    SET_QUESTION(state, payload) {
      state.question = payload;
    },
    SET_ANSWER(state, payload) {
      state.answer[payload.code][payload.key] = payload.value;
    },
    SET_ANSWER_FINISH(state, payload) {
      console.log(payload);
      state.answer.finished[payload] = true;
    },
    SET_RESULT(state, payload) {
      state.result.currentMember = payload.member;
      state.result.currentResult = payload.result;
    },
    SET_MISSION(state, payload) {
      state.mission.currentMember = payload.member;
      state.mission.currentMission = payload.mission;
    },
    SET_ALL_MISSION(state, payload) {
      state.allMission.currentMember = payload.member;
      state.allMission.currentMission = payload.mission;
    },
    SET_RATING(state, payload) {
      state.mission.currentMission.rating = payload;
    },
    SET_PSYCHECK_CODE(state, payload) {
      state.psycheck.testCode = payload;
    },
    SET_PSYCHECK_MEMBER(state, payload) {
      state.psycheck.currentMember = payload;
    },
    RESET_MEMBER(state) {
      state.member = {};
    },
    RESET_QUESTION(state) {
      state.question = {};
    },
    RESET_ANSWER(state) {
      state.answer = {
        CTT: {},
        MAT: {},
        PBT: {},
        finished: {
          CTT: false,
          MAT: false,
          PBT: false,
        },
      };
    },
    RESET_MISSION(state) {
      state.mission = {};
    },
    LOGOUT(state) {
      state.currentUser = {};
      state.accessToken = '';
      $router.push('/login');
    },
  },
  actions: {
    LOGOUT() {},
  },
  modules: {},
  plugins: [createPersistedState()],
});
