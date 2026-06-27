---
id: "intro"
title: "阅读指南"
sort: 10
status: "published"
---
<h2>阅读指南</h2>
        <p>主线是：订单创建 → 审核 → 库存判定 → 采购 → 出库准备 → 出库。售后是一组并行分支，订单在主线任何阶段都可能进入售后，处理完后回到主线对应状态。</p>
        <p>每一个具体动作都按统一的"操作单元"卡片描述：</p>

        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">什么时候做。例：订单进入"待判定"状态。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body">在哪个表 / 视图。例：<span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">商品出库单明细</span> <span class="arrow">→</span> <span class="chip chip--view">🔥 关联 SKU 为空</span></span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>第一件事</li>
                <li>第二件事</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">系统会发生什么。例：<span class="auto">订单出现在《销售订单》</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">常见错误 + 处理方式。</div>
          </div>
        </div>

        <h3>符号约定</h3>
        <p>文档中所有专有标记都用统一的视觉样式呈现，便于扫读时立刻识别类型。</p>

        <div class="tbl tbl--legend">
          <table>
            <thead><tr><th>类型</th><th>样式</th><th>含义</th></tr></thead>
            <tbody>
              <tr>
                <td>工作表</td>
                <td><span class="chip chip--sheet">商品出库单明细</span></td>
                <td>系统中的数据表，是订单与状态的载体</td>
              </tr>
              <tr>
                <td>视图</td>
                <td><span class="chip chip--view">🔥 关联 SKU 为空</span></td>
                <td>工作表的筛选 / 排序视角</td>
              </tr>
              <tr>
                <td>按钮</td>
                <td><span class="chip chip--btn">发起判定</span></td>
                <td>可点击的系统动作</td>
              </tr>
              <tr>
                <td>字段</td>
                <td><span class="chip chip--field">指定发货仓库</span></td>
                <td>表中的某一列</td>
              </tr>
              <tr>
                <td>状态值</td>
                <td><span class="chip chip--state">锁库存</span></td>
                <td>订单 / 库存的离散状态</td>
              </tr>
              <tr>
                <td>位置</td>
                <td><span class="loc"><span class="loc-pin"></span>《销售订单》<span class="arrow">→</span><span class="chip chip--view">只付运费</span></span></td>
                <td>表 + 视图的完整路径</td>
              </tr>
              <tr>
                <td>系统自动</td>
                <td><span class="auto">自动推送至《销售订单》</span></td>
                <td>无需人工干预，系统触发后自动发生</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>警示等级</h3>
        <p>文档中所有提醒分为两个等级，按视觉权重区分：</p>

        <div class="alert alert--severe">
          <div class="alert-head">
            <span class="alert-tag">不可逆 · 警示</span>
            <span class="alert-title">数据损坏 / 难以回滚</span>
          </div>
          <div class="alert-body">
            <p>独立成块、放在小节最前。常见：删除已审核数据、手动建虚拟移仓单、直接删退换货等。一旦出错难以回滚。</p>
          </div>
        </div>

        <div class="notice"><strong>流程前提 / 易遗漏</strong>——保留在步骤原位。是必要校验或常被忽略的细节，例如：发财务前勾选「已调货」、核对推送条数等。</div>
