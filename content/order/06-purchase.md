---
id: "purchase"
title: "四、商品采购"
sort: 60
status: "published"
---
<h2>四、商品采购</h2>
        <p>库存不足时自动生成采购单。本章覆盖采购前对账、采购入库、采购后锁库存。</p>

        <h3>4.1 采购前专项判定</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">采购单沉淀一段时间后才发财务，期间可能有退款回仓导致采购量虚高，需重新对账。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">入库单</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>在 <span class="chip chip--sheet">入库单</span> 搜采购单号。</li>
                <li><span class="chip chip--btn">调货前库存判定</span>。</li>
                <li>侧边栏弹三个数：
                  <ul>
                    <li><span class="chip chip--field">拟调货数</span>　采购单当前调货量</li>
                    <li><span class="chip chip--field">实时可用库存数量</span>　执行判定后还能锁库存的数量</li>
                    <li><span class="chip chip--field">应修正</span>　拟调货 − 实时可用（多调的量）</li>
                  </ul>
                </li>
                <li>审批通过 <span class="arrow">→</span> <span class="auto">自动修正出库单 + 入库明细</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">审批不通过 → 无事发生，需重新发起。</div>
          </div>
        </div>

        <h3>4.2 采购单入库</h3>
        <p>财务收到采购到货实物时执行。位置：<span class="chip chip--sheet">入库单</span>。两个方案：</p>

        <div class="sub-block">
          <h4>方案一 · 批量修改原入库明细（推荐）</h4>
          <p>位置：<span class="chip chip--sheet">财务批量处理采购单单价等</span></p>
          <div class="op-unit">
            <div class="op-row">
              <span class="op-label">步骤</span>
              <div class="op-body">
                <ol>
                  <li>添加新记录 <span class="arrow">→</span> 勾选 <span class="chip chip--field">业务采购单修正数量和单价?</span>。</li>
                  <li>关联入库单（<strong>只能关联一个</strong>）。</li>
                  <li>上传明细，格式：<code style="font-family: var(--font-mono); font-size: 13px;">需调货基础款号｜规格｜数量｜入库成本单价</code>。</li>
                  <li><span class="chip chip--btn">业务采购单修正数量和单价</span>。</li>
                  <li>进入对应入库单核对入库总数：有问题找李凡，无问题转 4.3。</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="sub-block">
          <h4>方案二 · 快速执行（兜底）</h4>
          <div class="op-unit">
            <div class="op-row">
              <span class="op-label">步骤</span>
              <div class="op-body">
                <ol>
                  <li><span class="chip chip--sheet">入库单</span> <span class="arrow">→</span> <span class="chip chip--btn">记录</span> 新建。</li>
                  <li>选 Excel 导入（批量）或粘贴导入（少量）。</li>
                  <li>选文件 <span class="arrow">→</span> 核对字段映射 <span class="arrow">→</span> 开始导入。</li>
                  <li>核对：导入条数 = 实际条数。</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <h3>4.3 采购后专项锁库存判定</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">采购入库完成，需把库存锁定到对应订单。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">入库单</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>筛选目标入库单号 / 渠道编号。</li>
                <li>批量操作 <span class="chip chip--sheet">入库明细</span> <span class="arrow">→</span> 删数据。</li>
                <li>上传新明细，格式：<code style="font-family: var(--font-mono); font-size: 13px;">SKU｜数量｜入库成本单价</code>。</li>
                <li><span class="chip chip--btn">专项锁库存</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">
              <ul>
                <li>采购不足 → <span class="auto">生成新采购单</span></li>
                <li>采购充足 → <span class="auto">按销售顺序锁库存</span></li>
              </ul>
            </div>
          </div>
        </div>

        <h3>4.4 特做补差价记录单</h3>
        <p>用于记录特做（非标准品）的补差价场景，便于财务对账。位置：<span class="chip chip--sheet">特做补差价记录单</span>。</p>
