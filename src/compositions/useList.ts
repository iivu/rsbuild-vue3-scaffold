import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

type Options = { page: number; size: number; immediate: boolean };
type ListApi<T> = (params?: any) => Promise<{ count: number; items?: T[]; lists?: T[] }>;
type UseListResult<T> = {
  page: Ref<number>;
  size: Ref<number>;
  loading: Ref<boolean>;
  done: Ref<boolean>;
  load: () => Promise<void>;
  loadMore: () => void;
  listData: Ref<T[]>;
};

export function useList<T>(listApi: ListApi<T>, options: Options = { page: 1, size: 20, immediate: true }): UseListResult<T> {
  // @ts-ignore
  const mergedOptions: Options = { page: 1, size: 20, immediate: true, ...options };
  const loading = ref(false);
  const done = ref(false);
  const page = ref(mergedOptions.page || 1);
  const size = ref(mergedOptions.size || 20);
  const listData = ref<T[]>([]) as Ref<T[]>;

  async function load() {
    try {
      loading.value = true;
      const res = await listApi({ page: page.value, size: size.value });
      listData.value = [...listData.value, ...(res.lists || [])];
      done.value = res.count < size.value;
    } catch (e) {
      done.value = true;
    } finally {
      loading.value = false;
    }
  }

  function loadMore() {
    console.log('LOAD MORE');
    if (done.value) return;
    if (loading.value) return;
    page.value++;
    load();
  }

  onMounted(() => {
    if (mergedOptions.immediate) load();
  });

  return { loading, done, page, size, load, loadMore, listData };
}
