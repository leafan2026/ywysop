---
id: "rule-release"
title: "关键规则"
sort: 50
status: "published"
---
<h2>关键规则</h2>

        <h3>库存释放</h3>
        <div class="tbl">
          <table>
            <thead><tr><th>阶段 / 状态</th><th>业务审核通过后释放</th></tr></thead>
            <tbody>
              <tr><td>调货前</td><td>—  本就没占用</td></tr>
              <tr><td>① 大仓直接锁库存</td><td>✅ 释放到大仓</td></tr>
              <tr><td>② 非大仓锁库存</td><td>✅ 经回仓判定决定</td></tr>
              <tr><td>③ 大仓拆换标锁库存</td><td>✅ 释放到大仓</td></tr>
              <tr><td>④ 非大仓拆换标锁库存</td><td>✅ 经回仓判定决定</td></tr>
              <tr><td>⑤ 库存不足调货中</td><td>❌ 不释放</td></tr>
              <tr><td>发货后</td><td>❌ 不释放，<strong>库存恢复靠仓库入库单</strong></td></tr>
            </tbody>
          </table>
        </div>
