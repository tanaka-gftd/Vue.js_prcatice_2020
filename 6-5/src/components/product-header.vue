<template> 
    <header>
        <h1 class="pageTitle">商品一覧（Vue.jsを使って、各コンポーネントに分けた場合）</h1>
            
        <!-- 検索欄 -->
        <div class="search">
            <div class="result">

                <!-- 親コンポーネントから受け取ったcountを表示する -->
                検索結果<span class="count">{{count}}件</span>
            </div>
            <div class="condition">
                <div class="target">
                    <label>

                        <!-- v-bind:checked="showSaleItem"で、チェックボックスの値が親コンポーネントと連動できるようにする。
                             v-on:change="$emit('showSaleItemChanged')"で、ユーザーがチェックボックスをクリックする度に、showSaleItemChangedという名のイベントが親コンポーネントに通知されるようにする-->
                        <input type="checkbox" v-bind:checked="showSaleItem" v-on:change="$emit('showSaleItemChanged')">セール対象

                    </label>
                    <label>

                        <!-- 上記と同様の挙動-->
                        <input type="checkbox" v-bind:checked="showDelvFree" v-on:change="$emit('showDelvFreeChanged')">送料無料
                    </label>
                </div>
                <div class="sort">
                    <label for="sort">並び替え</label>
                            
                    <!-- 基本的に、上記と同様の挙動。
                         今回の選択肢は２つだけだが、一般的にセレクトボックスは多数の選択肢を持つので、現在の値を$emit()の引数に乗せて親コンポーネントに渡す必要がある。 
                         また、select要素のvalue属性が返す値（optionタグで設定）は文字列なので、JavaScriptのparseInt()関数で数値型に変換してから$emit()の第２引数として設定する。（特に意味無し） 
                         現在の値は $event.target.valueで参照できる-->
                    <select id="sort" class="sorting" v-bind:value="sortOrder" v-on:change="$emit('sortOrderChanged', parseInt($event.target.value))">
                        <option value="1">標準</option>
                        <option value="2">価格が安い順</option>
                    </select>
                </div>
            </div>
        </div>
    </header>
</template>


<script>
    export default {
        name: 'ProductHeader',
        props: ['count', 'showSaleItem', 'showDelvFree', 'sortOrder']
    }
</script>

   
<style scoped>
.pageTitle {
    font-weight: normal;
    border-bottom: 2px solid;
}

.search {
    display: flex;
    justify-content: space-between;
}

.search .target {
    display: inline-block;
}

.search .target label {
    margin-right: 15px;
}

.search .sort {
    display: inline-block;
}
</style>
