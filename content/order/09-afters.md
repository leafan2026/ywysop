---
id: "afters"
title: "七、售后总览"
sort: 90
status: "published"
---
<h2>七、售后总览</h2>
        <p>售后流程不是主线的"尾巴"，而是 <strong>与主线并行的分支</strong>：订单在任意阶段都可能进入售后，处理完后再回流到主线对应的状态。</p>

        <h3>7.1 三种售后分支</h3>
        <div class="tbl">
          <table>
            <thead><tr><th>分支</th><th>触发时机</th><th>进入章节</th></tr></thead>
            <tbody>
              <tr><td><strong>发货前退换货</strong></td><td>订单在 <span class="chip chip--state">调货前</span>（锁库存 / 拆换标）或 <span class="chip chip--state">调货后</span>（调货中 / 已采购）阶段，尚未出库</td><td><a href="#pre-ship">八</a></td></tr>
              <tr><td><strong>线上发货后退换货</strong></td><td>订单已 <span class="chip chip--state">已出库</span>，家长收到货后要求退换</td><td><a href="#post-ship">九</a></td></tr>
              <tr><td><strong>线下换货（收发一体化）</strong></td><td>在学校现场直接收一件 / 发一件，无需快递</td><td><a href="#offline">十</a></td></tr>
            </tbody>
          </table>
        </div>

        <h3>7.2 选分支决策图</h3>
        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">售后申请</span>
            <span class="line"></span>
            <span class="step step--decision">订单当前出库状态?</span>
            <div class="paths">
              <div class="path">
                <span class="path-tag">在校现场</span>
                <span class="line"></span>
                <a href="#offline" class="step step--link">线下换货</a>
              </div>
              <div class="path">
                <span class="path-tag">已出库</span>
                <span class="line"></span>
                <a href="#post-ship" class="step step--link">发货后退换货</a>
              </div>
              <div class="path">
                <span class="path-tag path-tag--wide">未出库</span>
                <span class="line"></span>
                <a href="#pre-ship" class="step step--link">发货前退换货</a>
                <span class="line line--short"></span>
                <div class="branches">
                  <div class="branch">
                    <span class="branch-label">调货前</span>
                    <span class="line line--noarrow line--short"></span>
                    <span class="step step--muted">§ 8.1</span>
                  </div>
                  <div class="branch">
                    <span class="branch-label">调货后</span>
                    <span class="line line--noarrow line--short"></span>
                    <span class="step step--muted">§ 8.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>7.3 售后通用警示</h3>
        <div class="alert alert--severe">
          <div class="alert-head">
            <span class="alert-tag">不可逆 · 警示</span>
            <span class="alert-title">不要直接删退换货</span>
          </div>
          <div class="alert-body">
            <p>特别是已审核通过的；改用 <span class="chip chip--btn">审核不通过</span> 或 <span class="chip chip--btn">审核通过→待审核</span>（见 9.2 按钮说明）。</p>
          </div>
        </div>
        <div class="alert alert--severe">
          <div class="alert-head">
            <span class="alert-tag">不可逆 · 警示</span>
            <span class="alert-title">不要手动建虚拟移仓单</span>
          </div>
          <div class="alert-body">
            <p>9.3 退换货回仓判定 的虚拟移仓单由 <span class="auto">系统自动生成</span>，手动建会破坏账实关系。</p>
          </div>
        </div>
