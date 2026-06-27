---
id: "rule-residual"
title: "rule-residual"
sort: 60
status: "published"
---
<h3>剩货记录单</h3>
        <div class="tbl">
          <table>
            <thead><tr><th>状态</th><th>是否生成</th><th>用途</th></tr></thead>
            <tbody>
              <tr><td>① 大仓直接锁库存</td><td>✅</td><td>锁库存区的货发生退换，取出重新上架</td></tr>
              <tr><td>③ 大仓拆换标锁库存</td><td>✅</td><td>同 ①</td></tr>
              <tr><td>⑤ 库存不足调货中</td><td>✅</td><td>调货批次到货后取出上架，不要放进锁库存区</td></tr>
              <tr><td>② 非大仓锁库存</td><td>❌</td><td>由业务通过回仓判定单独处理</td></tr>
              <tr><td>④ 非大仓拆换标锁库存</td><td>❌</td><td>由业务通过回仓判定单独处理</td></tr>
              <tr><td>调货前 / 发货后</td><td>❌</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
