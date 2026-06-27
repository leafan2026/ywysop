---
id: "data"
title: "十一、基础数据维护"
sort: 130
status: "published"
---
<h2>十一、基础数据维护</h2>
        <p>低频维护事项；当主线流程因数据缺失报错时，回这里补数据。</p>

        <h3 id="data-school">A.1 新学校建档</h3>
        <p>任何新合作学校在系统中下单 / 出库前，必须先把学校名字添加到两个字段：<span class="chip chip--field">学校名称</span> 和 <span class="chip chip--field">学校名称-发货用</span>。</p>

        <h4>A.1.1 添加【学校名称】</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">新合作学校首次进入系统。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>数据处理 <span class="arrow">→</span> <span class="chip chip--sheet">线下批次/JSJ表单目录</span> <span class="arrow">→</span> 编辑表单</span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>进入编辑页面，找到 <span class="chip chip--field">学校名称</span> 字段，选中后在右侧字段编辑。</li>
                <li>添加选项 <span class="arrow">→</span> 编辑学校名称（<strong>准确全称</strong>）<span class="arrow">→</span> 保存。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>A.1.2 添加【学校名称-发货用】</h4>
        <p>新学校已在 A.1.1 添加后，按校标聚合到发货归类单位。</p>
        <div class="notice"><strong>学校名称-发货用是按校标聚合，不是按行政归属</strong>。例：沈阳市垚为学校小学部 / 初中部 / 高中部 → 三所学校，校标相同，发货用都选 <em>沈阳市垚为学校</em>。又例：沈阳市实验学校中海城小学 23–24 级用新校标、20–22 级用老校标 → 对应两个不同的"发货用"。</div>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">操作步骤同 A.1.1，添加选项 <span class="arrow">→</span> 保存。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body"><span class="chip chip--field">学校名称-发货用</span> 为空 → 在 <span class="chip chip--sheet">线下批次/JSJ表单目录</span> 更新该字段。</div>
          </div>
        </div>

        <h3 id="data-sku">A.2 新商品 / 新款式建档</h3>
        <p>新款 / 新校标必须先在 <span class="chip chip--sheet">存货档案（检索号）</span> 和 <span class="chip chip--sheet">商品 SKU 及库存状态</span> 建档，才能被订单引用。</p>

        <h4>A.2.1 添加检索号及款式基础信息</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">新款式 / 新校标首次进入系统。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>财务应用 <span class="arrow">→</span> 仓库调货与入库 <span class="arrow">→</span> <span class="chip chip--sheet">存货档案（检索号）</span> <span class="arrow">→</span> <span class="chip chip--btn">加记录</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>参考总部的"存货档案表"和"二维库存表"。</li>
                <li>仅维护 <strong>基础款号</strong> 和 <strong>校标</strong>（这里不细到尺码）。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>A.2.2 添加商品 SKU 与车标款号 SKU</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">A.2.1 完成后，需要细化到尺码段。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>财务应用 <span class="arrow">→</span> 仓库调货与入库 <span class="arrow">→</span> <span class="chip chip--sheet">商品 SKU 及库存状态</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>参考总部的"存货档案表"和"二维库存表"。</li>
                <li>添加 <strong>全尺码段</strong> 基础款和车标款。</li>
                <li>校标也需要创建 SKU，<strong>校标的检索号与 SKU 保持一致</strong>。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>A.2.3 方法二 · 批量补齐尺码段</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">某款式的 <span class="chip chip--sheet">商品 SKU 及库存状态</span> 中尺码不全，需要批量补齐。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>财务应用 <span class="arrow">→</span> 仓库调货与入库 <span class="arrow">→</span> <span class="chip chip--sheet">sku 目录维护创建（批处理）</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>填基础信息后，选所有该学校的尺码段，<span class="chip chip--btn">提交</span>。</li>
                <li>选中刚提交的这条数据 <span class="arrow">→</span> 点进去 <span class="arrow">→</span> 左上角 <span class="chip chip--btn">创建</span>。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>A.2.4 添加学校商品目录</h4>
        <p>新款式 SKU 建好后，要让对应学校能下单这款。位置：<span class="chip chip--sheet">学校商品目录名册</span>。</p>
        <div class="notice">推荐从 <span class="chip chip--sheet">商品属性（辅助批次管理单价）</span> 导出已推送过的数据 → 导入到目录（<strong>导入前先备份</strong>）。每天凌晨 2 点系统会自动备份。</div>

        <h3 id="data-class">A.3 订单分类维护</h3>
        <p>销售订单要正确归属到学校 / 部门 / 销售类别，才能在仪表盘 / 财务对账 / 库存判定中被正确聚合。</p>

        <h4>A.3.1 学校名称、所属部门、销售分类维护</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">新订单进入系统、或既有订单分类有误。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">销售订单</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>按 A.1.2 的逻辑维护 <span class="chip chip--field">学校名称-发货用</span>。</li>
                <li>维护 <span class="chip chip--field">所属部门</span>、<span class="chip chip--field">销售分类</span>。</li>
                <li>填完 <span class="chip chip--field">销售分类</span> 后，<strong>记得点上方的</strong> <span class="chip chip--btn">更新销售分类</span>、<span class="chip chip--btn">备份学校目录名单</span>。</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="notice"><strong>销售分类只在"销售订单"上维护</strong>　调换、样衣等其他非销售用途的订单 <strong>不需要</strong> 维护销售分类。</div>

        <h4>A.3.2 金数据漏推处理</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">怀疑某金数据订单漏推到明道云。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">金数据漏推记录表</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>看 <span class="chip chip--field">是否已经补推</span> 列：显示 <span class="chip chip--state">否</span> 即为疑似漏推。</li>
                <li>核实是否真的需要补推：
                  <ul>
                    <li>大部分付款状态是 <code style="font-family: var(--font-mono); font-size: 13px;">WAIT_BUYER_PAY</code> → <strong>无需补推</strong>（家长还没付款）。</li>
                    <li>未付款订单：备注"未付款"。</li>
                  </ul>
                </li>
                <li>需要补推的订单 → 点进数据 <span class="arrow">→</span> 左上角 <span class="chip chip--btn">漏推复核</span> <span class="arrow">→</span> <span class="chip chip--btn">一键补推</span>。</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="notice"><strong>兜底补推</strong>　在金数据后台数据页面给目标数据打颜色标记 <span class="arrow">→</span> <span class="auto">自动触发推送</span> <span class="arrow">→</span> 在 <span class="chip chip--sheet">销售订单</span> 验证。</div>

        <h3 id="data-misc">A.4 出库单序号（业务辅助标记）</h3>
        <p>业务在订单创建后给销售订单手动打的标记，目的是后续库存判定 / 处理订单时方便归类。<strong>目前对出库流程无实际意义</strong>，可按需使用。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">出库单进度表</span> / <span class="chip chip--sheet">出库单明细</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--sheet">出库单进度表</span> <span class="arrow">→</span> <span class="chip chip--btn">加记录</span>，<span class="auto">系统自动生成序号</span>——只填名头基础信息即可。</li>
                <li>把销售订单 / 出库明细关联到该序号（三种方式见下表）。</li>
              </ol>
              <div class="tbl">
                <table>
                  <thead><tr><th>方式</th><th>路径</th><th>适用场景</th></tr></thead>
                  <tbody>
                    <tr><td>手动关联</td><td><span class="chip chip--sheet">出库单进度表</span> 明细页面 <span class="arrow">→</span> 勾选记录 <span class="arrow">→</span> 关联至指定序号</td><td>少量、即时</td></tr>
                    <tr><td>批量编辑</td><td><span class="chip chip--sheet">出库单明细</span> <span class="arrow">→</span> 批量编辑 <span class="arrow">→</span> 选 <span class="chip chip--field">【最终】出库单序号</span> <span class="arrow">→</span> 录入序号</td><td>大批量统一</td></tr>
                    <tr><td>系统自动</td><td>「线下批次」目录新增 <span class="chip chip--field">默认出单序号</span> 字段 <span class="arrow">→</span> 数据录入后自动打标签</td><td>固定批次号</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="notice"><strong>批次号不固定</strong>（如今天 101 明天 102）→ 保持 <span class="chip chip--field">默认出单序号</span> 为空，避免误关联。<br><strong>5 分钟延迟</strong>　点击"一键批量关联"前 5 分钟内创建的销售单 / 出库单明细不会被关联。</div>

        <h3>A.5 身高尺码对照表</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">尺码对照表</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--btn">导出</span> 原表。</li>
                <li>Excel 改：身高 0–999、体重 0–999、尺码映射、商品分类与 SKU 一致。</li>
                <li><span class="chip chip--btn">导入</span> <span class="arrow">→</span> 选"仅更新"（不新增、不删除）。</li>
                <li><span class="chip chip--btn">关联目录</span> <span class="arrow">→</span> <span class="auto">自动匹配分类</span>。</li>
                <li>随机抽几个身高体重 → 测推荐。</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="alert alert--severe">
          <div class="alert-head">
            <span class="alert-tag">不可逆 · 警示</span>
            <span class="alert-title">导入前先备份</span>
          </div>
          <div class="alert-body">
            <p>对照表覆盖整个学校的尺码推荐逻辑，错误数据无法快速回滚。维护好可大幅减少尺码退换货。</p>
          </div>
        </div>

        <h3>A.6 商品 SKU 维护（汇总）</h3>
        <p>所有流程的基础。订单 / 退换货 / 出入库 / 财务都关联此目录。位置：<span class="chip chip--sheet">商品 SKU 及库存状态</span>。</p>

        <div class="dtree">
          <div class="dtree-q">情况一 · 新建商品</div>
          <div class="dtree-branches">
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--yes">有检索号</span>
              <div class="dtree-body">直接选 <span class="arrow">→</span> 在 <span class="chip chip--sheet">商品 SKU 及库存状态</span> 填齐必填项。</div>
            </div>
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--no">无检索号</span>
              <div class="dtree-body">先去 <span class="chip chip--sheet">存货档案（检索号）</span> 加索引号 <span class="arrow">→</span> 回 SKU 表填齐必填项。<br><span style="font-size: 13px; color: var(--ink-48);">校标索引号和 SKU 保持一致。</span></div>
            </div>
          </div>
        </div>

        <div class="dtree">
          <div class="dtree-q">情况二 · 批量补充新尺码 / 款式（有索引号、非校标、非配饰）</div>
          <div class="dtree-branches">
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--yes">有索引号</span>
              <div class="dtree-body">直接选。</div>
            </div>
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--no">无索引号</span>
              <div class="dtree-body">去 <span class="chip chip--sheet">存货档案</span> 加 <span class="arrow">→</span> 在 <span class="chip chip--sheet">SKU 目录批量维护（批处理）</span> 填必填项 <span class="arrow">→</span> 创建。</div>
            </div>
          </div>
        </div>

        <p>详细步骤见 A.2 新商品 / 新款式建档。</p>

        <h3>A.7 金数据表单制作</h3>
        <div class="link-card">
          <div class="link-card-text"><strong>模板</strong>　复制后修改字段使用</div>
          <a href="https://jinshuju.net/forms/YLQOYC/edit" target="_blank" rel="noopener">打开模板 →</a>
        </div>

        <h4>步骤 1 · 字段维护</h4>
        <p>复制模板 <span class="arrow">→</span> 改标题 <span class="arrow">→</span> 调字段：</p>
        <ul class="points">
          <li>带 <span class="chip chip--field">【 】</span> 的字段：不能删，可改名 / 调顺序。</li>
          <li>不需要家长填的：隐藏。</li>
          <li>商品字段：款号格式 <code style="font-family: var(--font-mono); font-size: 13px;">商品款号_校标记编码</code>；不需要快递费 → 删相关字段。</li>
        </ul>

        <h4>步骤 2 · 配置自动化推送</h4>
        <div class="tbl">
          <table>
            <thead><tr><th>版本</th><th>入口</th></tr></thead>
            <tbody>
              <tr><td>旧版</td><td>表单设置 <span class="arrow">→</span> 数据推送 <span class="arrow">→</span> 将数据以 JSON 格式发送给第三方</td></tr>
              <tr><td>新版</td><td>表单设置 <span class="arrow">→</span> 提醒推送 <span class="arrow">→</span> 新建提醒推送（有数据新增 → 配置 Webhook）</td></tr>
            </tbody>
          </table>
        </div>
        <p>Webhook 地址同 1.1 线上 · 金数据 → 明道云。</p>
        <div class="notice"><strong>补推送</strong>（漏推 / 表单只收集再统一推送）：自动化触发器选 <span class="chip chip--view">数据更新</span> <span class="arrow">→</span> 在数据页面给目标数据打颜色标记 <span class="arrow">→</span> <span class="auto">自动推送</span> <span class="arrow">→</span> 在明道云验证。</div>

        <h3>A.8 套装配置</h3>

        <h4>A.8.1 套装尺码</h4>
        <p>位置：<span class="chip chip--sheet">套装身高尺码</span> / <span class="chip chip--sheet">套餐尺码辅助表</span>。家长选一个尺码，系统自动拆成各单品对应尺码。</p>
        <div class="sub-block">
          <p style="margin: 0; font-size: 15.5px; color: var(--ink-80);"><strong>示例</strong>　130T 特体套装 → 毛衫 150 + T 恤 150 + 裤子 140 + 外套 150。</p>
        </div>

        <h4>A.8.2 套装制作</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">套装</span> / <span class="chip chip--sheet">套装内容</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--sheet">套装</span> 添加记录：名称 / 款号（如 <code style="font-family: var(--font-mono); font-size: 13px;">YWY-TZ-2026001</code>）/ 学校 / 类型（标准 / 特体）。</li>
                <li><span class="chip chip--sheet">套装内容</span> 添加单品（款号 + 商品分类，≥ 2 件）。</li>
                <li>含特体 → 关联 A.8.1 的规则。</li>
                <li>保存 → 建测试订单验证拆分。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>A.8.3 套装无法拆分排查</h4>
        <ol class="points" style="list-style: decimal; padding-left: 24px;">
          <li>套装尺码维护配了 + 套装制作完成?</li>
          <li>套装中的商品分类 = SKU 中的分类?</li>
          <li>套装中每个单品在 SKU 表存在?</li>
          <li>看系统错误提示，补缺失数据。</li>
          <li>重新推送订单 → 验证拆分。</li>
        </ol>

        <h3>A.9 入库 / 调库 / 改单价 / 新建仓库</h3>
        <div class="tbl">
          <table>
            <thead><tr><th>场景</th><th>位置</th><th>要点</th></tr></thead>
            <tbody>
              <tr><td>入库单</td><td>财务应用 <span class="arrow">→</span> <span class="chip chip--sheet">入库单</span></td><td>见 4.2 采购单入库 方案一</td></tr>
              <tr><td>调库 / 移仓</td><td>财务应用 <span class="arrow">→</span> <span class="chip chip--sheet">移仓单/调库单</span></td><td>调出仓库必须有库存；不能删只能作废；<strong>虚拟移仓单由 9.3 自动生成，不要手动建</strong></td></tr>
              <tr><td>批量改采购单价</td><td><span class="chip chip--sheet">财务批量处理采购单单价等</span></td><td>见下</td></tr>
              <tr><td>新建仓库</td><td><span class="chip chip--sheet">入库单</span> 仓库字段 + <span class="chip chip--sheet">商品 SKU 及库存状态</span> 仓库字段</td><td>见下</td></tr>
            </tbody>
          </table>
        </div>

        <h4>批量改采购单价</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>打开 <span class="chip chip--sheet">财务批量处理采购单单价等</span> <span class="arrow">→</span> 关联采购单。</li>
                <li>填入库成本 + 代理销售价 <span class="arrow">→</span> <span class="chip chip--btn">补充单价</span>。</li>
                <li>看 <span class="chip chip--field">执行情况</span> 确认。</li>
                <li>改错 → 把 <span class="chip chip--field">执行情况</span> 清空 <span class="arrow">→</span> 改单价 <span class="arrow">→</span> 再点 <span class="chip chip--btn">补充单价</span>。</li>
              </ol>
            </div>
          </div>
        </div>

        <h4>新建仓库</h4>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--sheet">入库单</span> <span class="arrow">→</span> 编辑 <span class="chip chip--field">仓库</span> 字段 <span class="arrow">→</span> 添加新仓库选项。</li>
                <li><span class="chip chip--sheet">商品 SKU 及库存状态</span> <span class="arrow">→</span> 复制"力旺高中"的筛选配置 <span class="arrow">→</span> 把汇总范围改成新仓库名。</li>
                <li>测试：建入库单 + 调库单 → 看库存是否正确更新。</li>
              </ol>
            </div>
          </div>
        </div>
